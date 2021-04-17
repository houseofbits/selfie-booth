<?php

namespace App\Controllers;

use App\Models\EmailConfigModel;
use App\Models\ImageModel;
use App\Services\EmailService;
use App\Services\ImageService;
use App\Services\SharingService;
use App\Services\TranslationsService;
use App\Structures\ImageInfoStructure;
use CodeIgniter\Controller;
use CodeIgniter\RESTful\ResourceController;

class ConfigurationApiController extends ResourceController
{
    public function getEmailConfiguration()
    {
        $emailService = new EmailService();
        return $this->respond($emailService->getConfiguration());
    }

    public function saveEmailConfiguration()
    {
        $emailService = new EmailService();

        $validation = \Config\Services::validation();

        $validation->setRules(
            [
                'host' => 'required|string',
                'username' => 'required|string',
                'password' => 'required|string',
                'senderAddress' => 'required|valid_email'
            ]
        );
        if (!$validation->withRequest($this->request)->run()) {
            $errors = array_values($validation->getErrors());
            return $this->respond($errors, 400);
        }

        try {
            $emailService->saveConfiguration($this->request);
        } catch (\Exception $e) {
            return $this->respond("Save error. " . $e->getMessage(), 400);
        }

        if ($this->request->getVar('testConnection', FILTER_VALIDATE_BOOLEAN)) {
            try {
                $emailService->testConnection();
            } catch (\Exception $e) {
                return $this->respond("Connection error. " . $e->getMessage(), 400);
            }
        }

        return $this->respond(true);
    }

    public function sendEmailForTest()
    {
        $emailService = new EmailService();

        $validation = \Config\Services::validation();

        $validation->setRules(
            [
                'receivingEmailAddress' => 'required|valid_email',
                'language' => 'required',
                'imageName' => 'required'
            ]
        );

        if (!$validation->withRequest($this->request)->run()) {
            $errors = array_values($validation->getErrors());
            return $this->respond($errors, 400);
        }

        try {
            $emailService->sendEmail(
                $this->request->getVar('receivingEmailAddress'),
                $this->request->getVar('imageName')
            );
        } catch (\Exception $e) {
            return $this->respond("Email send failed. " . $e->getMessage(), 400);
        }

        return $this->respond(true);
    }

    public function getSharingConfiguration()
    {
        $sharingService = new SharingService();
        return $this->respond($sharingService->getConfiguration());
    }

    public function saveSharingConfiguration()
    {
        $sharingService = new SharingService();

        try {
            $sharingService->saveConfiguration($this->request);
        } catch (\Exception $e) {
            return $this->respond("Save error. " . $e->getMessage(), 400);
        }

        return $this->respond(true);
    }

    public function getTranslationsList()
    {
        $translationsService = new TranslationsService();
        return $this->respond($translationsService->getTranslationsListResponse());
    }

    public function getTranslation($key)
    {
        $translationsService = new TranslationsService();
        return $this->respond($translationsService->getTranslation($key));
    }

    public function saveTranslation()
    {
        $translationsService = new TranslationsService();
        try {
            $translationsService->saveTranslation($this->request);
        } catch (\Exception $e) {
            return $this->respond("Translation save failed. " . $e->getMessage(), 400);
        }

        return $this->respond(true);
    }

    public function cliCreateTranslationKey(string $key)
    {
        $translationsService = new TranslationsService();
        $translationsService->createTranslationKey($key);
        echo "Translation key inserted " . $key;
    }

    public function getTranslationsResource()
    {
        $translationsService = new TranslationsService();
        $translations = $translationsService->getTranslations();
        return $this->response->setHeader('Content-Type', 'application/json')
            ->setJSON($translations->translations);
    }

    public function getAllImages()
    {
        $imagesService = new ImageService();
        $images = $imagesService->getListOfImages();
        $images = array_map(
            function (ImageModel $model) {
                return new ImageInfoStructure($model);
            },
            $images
        );
        return $this->response->setHeader('Content-Type', 'application/json')
            ->setJSON($images);
    }

    public function getImagesCount()
    {
        $images = ImageModel::findAllIndexes();
        return $this->response->setHeader('Content-Type', 'application/json')
            ->setJSON(['count' => count($images)]);
    }

    public function deleteImage()
    {
        $imageService = new ImageService();
        $id = $this->request->getVar('id');
        if ($id) {
            $imageService->deleteImage($id);
        }
        return $this->getAllImages();
    }

    public function cleanUpImages()
    {
        $imageService = new ImageService();
        $imageService->cleanUpImages();
        $images = ImageModel::findAllIndexes();
        return $this->response->setHeader('Content-Type', 'application/json')
            ->setJSON(['count' => count($images)]);
    }
}
