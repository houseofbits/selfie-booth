<?php

namespace App\Controllers;

use App\Models\EmailConfigModel;
use App\Services\EmailService;
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
            $emailService->sendEmail($this->request->getVar('receivingEmailAddress'));
        } catch (\Exception $e) {
            return $this->respond("Email send failed. " . $e->getMessage(), 400);
        }

        return $this->respond(true);
    }
}
