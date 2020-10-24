<?php

namespace App\Services;

use App\Models\ImageDataStructure;
use App\Models\ImageModel;
use CodeIgniter\Files\File;
use Endroid\QrCode\QrCode;
use Exception;

class ImageService
{
    public string $publicAppUrl = "https://www.kautkaadalapa.lv/atteelushaariite/{TYPE}/{ID}";

    public function __construct()
    {
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

    public function getQrCodeForPublicApp(string $imageId, string $type): ?ImageDataStructure
    {
        $imageModel = ImageModel::findOne($imageId);
        if ($imageModel instanceof ImageModel) {
            $qrCode = new QrCode(str_replace(['{TYPE}', '{ID}'], [$type, $imageModel->id], $this->publicAppUrl));

            return new ImageDataStructure($qrCode->getContentType(), $qrCode->writeString());
        }
        return null;
    }
}



