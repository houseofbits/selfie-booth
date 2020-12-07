<?php

namespace App\Controllers;

use App\Models\ImageModel;
use App\Services\FacebookService;
use App\Services\ImageService;
use CodeIgniter\Controller;
use CodeIgniter\Session\Session;
use Config\Services;

class SharingController extends Controller
{
    private const IMAGE_SESSION_KEY = 'imageId';
    private const IMAGE_SESSION_TTL = 600;

    /** @var FacebookService  */
    private $fbService;

    /** @var Session  */
    private $session;

    /** @var ImageService  */
    private $imageService;

    public function __construct()
    {
        helper('transl');
        $this->session = Services::session();
        $this->fbService = new FacebookService;
        $this->imageService = new ImageService();
    }

    public function share(string $language, string $imageId)
    {
        $image = ImageModel::findOne($imageId);
        if (!$image) {
            return $this->pageNotFound();
        }
        $this->session->setTempdata(self::IMAGE_SESSION_KEY, $imageId, self::IMAGE_SESSION_TTL);
        try {
            $this->fbService->getAccessToken();
        } catch (\Exception $e) {
            return redirect()->to('/auth/' . $language);
        }
        return redirect()->to('/share/' . $language);
    }

    public function auth(string $language)
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
            $authUrl = $this->fbService->getLoginUrl();
            return view(
                'sharing/index',
                [
                    'imageId' => $imageId,
                    'authenticated' => false,
                    'authUrl' => $authUrl,
                    'timeLeft' => $timeLeft = $this->imageService->getSharingTimeLeftFormatted($language, $image)
                ]
            );
        } catch (\Exception $e) {
            return $this->pageNotFound();
        }
    }

    public function authenticated(string $language)
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
            return view(
                'sharing/index',
                [
                    'imageId' => $imageId,
                    'authenticated' => true,
                    'timeLeft' => $timeLeft = $this->imageService->getSharingTimeLeftFormatted($language, $image)
                ]
            );
        } catch (\Exception $e) {
            return $this->pageNotFound();
        }
    }

    public function postToFacebook()
    {

    }

    public function download(string $language, string $imageId)
    {
        try {
            $image = ImageModel::findOne($imageId);
            if (!$image) {
                throw new \Exception('Image not found');
            }
            if (!$this->imageService->isSharingAvailable($image)) {
                throw new \Exception('Image not found');
            }

            $this->session->setTempdata(self::IMAGE_SESSION_KEY, $imageId, self::IMAGE_SESSION_TTL);

            return view(
                'sharing/index',
                [
                    'imageId' => $imageId,
                    'downloadOnly' => true,
                    'authenticated' => false,
                    'timeLeft' => $timeLeft = $this->imageService->getSharingTimeLeftFormatted($language, $image)
                ]
            );
        } catch (\Exception $e) {
            return $this->pageNotFound();
        }
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
            return $this->pageNotFound();
        }
    }

    private function pageNotFound()
    {
        return view('sharing/404');
    }
}
