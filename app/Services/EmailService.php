<?php

namespace App\Services;

use App\Models\EmailConfigModel;
use CodeIgniter\HTTP\Request;
use CodeIgniter\Model;
use PHPMailer\PHPMailer\PHPMailer;

class EmailService extends Model
{
    protected PHPMailer $mail;

    public function __construct()
    {
        parent::__construct();

        $this->mail = new PHPMailer(true);
    }

    public function validateEmailAddress(string $address): bool
    {
        return PHPMailer::validateAddress($address);
    }

    /**
     * @param $emailAddress
     * @param null $imageId
     * @throws \Exception
     */
    public function sendEmail($emailAddress, $imageId = null, $language = null): void
    {
        throw new \Exception("Not implemented");
    }

    /**
     * @throws \Exception
     */
    public function testConnection(): void
    {
        throw new \Exception("Not implemented");
    }

    public function getConfiguration(): EmailConfigModel
    {
        return EmailConfigModel::findOrCreate();
    }

    /**
     * @param Request $request
     * @throws \Exception
     */
    public function saveConfiguration(Request $request): void
    {
        $emailModel = EmailConfigModel::findOrCreate();
        $emailModel->enabled = $request->getVar('enabled', FILTER_VALIDATE_BOOLEAN) ?? false;
        $emailModel->host = $request->getVar('host') ?? '';
        $emailModel->username = $request->getVar('username') ?? '';
        $emailModel->password = $request->getVar('password') ?? '';
        $emailModel->port = $request->getVar('port') ?? '';
        $emailModel->senderAddress = $request->getVar('senderAddress') ?? '';

        $emailModel->save();
    }
}