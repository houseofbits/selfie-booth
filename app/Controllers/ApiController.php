<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Structures\ImageDataStructure;
use App\Models\ImageModel;
use App\Services\EmailService;
use App\Services\ImageService;
use CodeIgniter\HTTP\Exceptions\HTTPException;
use CodeIgniter\RESTful\ResourceController;
use Exception;

class ApiController extends ResourceController
{
    protected $format = 'json';

    /** @var EmailService */
    protected $emailService;

    /** @var ImageService */
    protected $imageService;

    public function __construct()
    {
        $this->emailService = new EmailService();
        $this->imageService = new ImageService();
    }

    public function sendEmail()
    {
        $email = $this->request->getVar('email');
        $imageId = $this->request->getVar('imageId');

        try {
            $this->emailService->sendEmail($email, $imageId);
        } catch (Exception $e) {
            return $this->respond("Email error. " . $e->getMessage(), 400);
        }

        return $this->respond(true);
    }

    public function uploadImage()
    {
        try {
            $path = $this->request->getFile('image')->store("images");
        } catch (HTTPException $e) {
            return $this->failNotFound($e->getMessage());
        }

        $image = $this->imageService->createImage($path);
        if ($image instanceof ImageModel) {
            return $this->respond(['id' => $image->id]);
        }
        return $this->failNotFound("Failed to create image");
    }

    public function getQRCode(string $id, string $type, string $lang)
    {
        $imageData = $this->imageService->getQrCodeForPublicApp($id, $type, $lang);
        if ($imageData instanceof ImageDataStructure) {
            return $this->response->setHeader('Content-Type', $imageData->mimeType)
                ->setBody($imageData->data);
        }
        return $this->failNotFound("QR Code not found");
    }

    public function dropExpiredImages()
    {
        //TODO
    }

    public function serveImage(string $id)
    {
        $imageData = $this->imageService->getImageData($id);
        if ($imageData instanceof ImageDataStructure) {
            return $this->response->setHeader('Content-Type', $imageData->mimeType)
                ->setBody($imageData->data);
        }
        return $this->failNotFound("Image not found");
    }

    public function validateEmail()
    {
        $email = $this->request->getVar('email');
        return $this->respond($this->emailService->validateEmailAddress($email));
    }

    public function syncListOfImages()
    {
        $images = $this->imageService->getListOfImages();
        $inputData = $this->request->getJSON();
        $result = $this->imageService->getDiffListOfImages($inputData->data ?? [], $images);
        return $this->respond($result);
    }
}
