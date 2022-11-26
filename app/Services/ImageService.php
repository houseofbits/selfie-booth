<?php

namespace App\Services;

use App\Models\SharingConfigModel;
use App\Structures\ImageDataStructure;
use App\Models\ImageModel;
use App\Structures\ImageInfoStructure;
use CodeIgniter\Files\File;
use Endroid\QrCode\QrCode;
use Exception;

class ImageService
{
    const ACTIVE_IMAGES_COUNT = 40;

    /** @var string */
    public $publicAppUrl = "";

    /** @var int */
    public $sharingAvailabilityMinutes = 1440;

    public function __construct()
    {
        $sharingSettings = SharingConfigModel::findOrCreate();
        $this->sharingAvailabilityMinutes = $sharingSettings->shareableLinkTTL;
        $this->publicAppUrl = $sharingSettings->publicAppUrl;
    }

    public function createImage(string $path): ?ImageModel
    {
        $imageModel = new ImageModel();
        $imageModel->imageUrl = $path;
        $imageModel->createdAt = time();

        try {
            $imageModel->save();
        } catch (Exception $e) {
            return null;
        }
        return $imageModel;
    }

    /**
     * @param string $id
     * @throws Exception
     */
    public function deleteImage(string $id)
    {
        $imageModel = ImageModel::findOne($id);
        if ($imageModel instanceof ImageModel) {
            $imageModel->delete();
        }
    }

    public function getImageData(string $id): ?ImageDataStructure
    {
        $imageModel = ImageModel::findOne($id);
        if ($imageModel instanceof ImageModel) {
            $file = new File($imageModel->getFullUrl());
            $fileData = $file->openFile('r');

            return new ImageDataStructure($file->getMimeType(), $fileData->fread($fileData->getSize()));
        }
        return null;
    }

    public function getQrCodeForPublicApp(string $imageId, string $type, string $language = 'lv'): ?ImageDataStructure
    {
        $imageModel = ImageModel::findOne($imageId);
        if ($imageModel instanceof ImageModel) {
            $link = trim($this->publicAppUrl, '/');

            if ($type === 'fb') {
                $link .= '/share/' . $language . '/' . $imageModel->id;
            } else {
                $link .= '/download/' . $language . '/' . $imageModel->id;
            }

            $qrCode = new QrCode($link);

            return new ImageDataStructure($qrCode->getContentType(), $qrCode->writeString());
        }
        return null;
    }

    public function isSharingAvailable(ImageModel $image): bool
    {
        $diff = (time() - $image->createdAt) / 60;
        return $this->sharingAvailabilityMinutes > $diff;
    }

    public function getSharingTimeLeftFormatted(string $language, ImageModel $image): string
    {
        $diffMinutes = $this->sharingAvailabilityMinutes - ((time() - $image->createdAt) / 60.0);
        $diffHours = $diffMinutes / 60.0;
        $diffDays = $diffHours / 24.0;

        if ($diffHours < 1.0) {
            return floor($diffMinutes) . ' ' . transl('sharing.time-minutes', $language);
        }

        if ($diffDays < 1.0) {
            return floor($diffHours) . ' ' . transl('sharing.time-hours', $language);
        }

        $remainingHours = floor(fmod($diffDays, 1) * 24.0);

        $result = floor($diffDays) . ' ' . transl('sharing.time-days', $language);
        if ($remainingHours > 0) {
            $result .= ' ' . $remainingHours . ' ' . transl('sharing.time-hours', $language);
        }

        return $result;
    }

    public function getListOfImages(): array
    {
        $images = ImageModel::findAll();
        $this->sortImagesByNewest($images);
        return $images;
    }

    public function getListOfImagesActive(): array
    {
        $images = ImageModel::findAll();
        $this->sortImagesByNewest($images);

        $images = array_splice($images, 0, self::ACTIVE_IMAGES_COUNT);

        return array_map(function (ImageModel $imageModel) {
            return $imageModel->id;
        }, $images);
    }

    /**
     * @param string[] $source
     * @param string[] $destination
     * @return array
     */
    public function getDiffListOfImages(array $source, array $destination): array
    {
        return array_values(array_diff($destination, $source));
    }

    public function cleanUpImages() : void
    {
        $images = ImageModel::findAll();
        $this->sortImagesByNewest($images);
        $images = array_slice($images, self::ACTIVE_IMAGES_COUNT);
        foreach ($images as $image) {
            if (!$this->isSharingAvailable($image)) {
                $image->delete();
            }
        }
    }

    private function sortImagesByNewest(array &$images): void
    {
        usort(
            $images,
            function (ImageModel $a, ImageModel $b) {
                return $a->createdAt < $b->createdAt;
            }
        );
    }
}



