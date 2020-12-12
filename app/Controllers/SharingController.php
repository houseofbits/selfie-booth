<?php

namespace App\Controllers;

use App\Models\ImageModel;
use App\Models\SharingConfigModel;
use App\Services\FacebookService;
use App\Services\ImageService;
use CodeIgniter\Controller;
use CodeIgniter\Session\Session;
use Config\Services;

class SharingController extends Controller
{
    private const IMAGE_SESSION_KEY = 'imageId';
    private const IMAGE_SESSION_TTL = 600;

    /** @var Session */
    private $session;

    /** @var ImageService */
    private $imageService;

    public function __construct()
    {
        helper('transl');
        $this->session = Services::session();
        $this->imageService = new ImageService();

        $sharingConfigModel = SharingConfigModel::findOrCreate();
    }

    public function share(string $language, string $imageId)
    {
        $image = ImageModel::findOne($imageId);
        if (!$image) {
            return $this->pageNotFound('Image not found');
        }

        if (!$this->imageService->isSharingAvailable($image)) {
            return $this->pageNotFound('Image sharing link expired');
        }

        $this->session->setTempdata(self::IMAGE_SESSION_KEY, $imageId, self::IMAGE_SESSION_TTL);

        return view(
            'sharing/index',
            [
                'lang' => $language,
                'imageId' => $imageId,
                'download' => false,
                'timeLeft' => $this->imageService->getSharingTimeLeftFormatted($language, $image)
            ]
        );
    }

    public function download(string $language, string $imageId)
    {
        $image = ImageModel::findOne($imageId);
        if (!$image) {
            return $this->pageNotFound('Image not found');
        }

        if (!$this->imageService->isSharingAvailable($image)) {
            return $this->pageNotFound('Image sharing link expired');
        }

        $this->session->setTempdata(self::IMAGE_SESSION_KEY, $imageId, self::IMAGE_SESSION_TTL);

        return view(
            'sharing/index',
            [
                'lang' => $language,
                'imageId' => $imageId,
                'download' => true,
                'timeLeft' => $this->imageService->getSharingTimeLeftFormatted($language, $image)
            ]
        );
    }

    public function downloadImage()
    {
        try {
            $imageId = $this->session->getTempdata(self::IMAGE_SESSION_KEY);
            if (!$imageId) {
                throw new \Exception('Image session error');
            }
            $image = ImageModel::findOne($imageId);
            if (!$image) {
                throw new \Exception('Image not found');
            }
            if (!$this->imageService->isSharingAvailable($image)) {
                throw new \Exception('Image not found');
            }
            $imageData = $this->imageService->getImageData($imageId);
            if (!$imageData) {
                throw new \Exception('Image not found');
            }
            return $this->response->download('selfie-booth-image.png', $imageData->data);
        } catch (\Exception $e) {
            log_message('error', '[ERROR] {exception}', ['exception' => $e]);
            return $this->pageNotFound();
        }
    }

    private function pageNotFound(string $message = '')
    {
        return view('sharing/404', ['message' => $message]);
    }
}
