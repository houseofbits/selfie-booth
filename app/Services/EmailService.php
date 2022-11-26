<?php

namespace App\Services;

use App\Models\EmailConfigModel;
use App\Models\ImageModel;
use App\Structures\TranslationStructure;
use CodeIgniter\Email\Email;
use CodeIgniter\HTTP\Request;
use CodeIgniter\Model;

class EmailService
{
    /** @var Email|mixed  */
    protected $email;
    /** @var EmailConfigModel  */
    protected $emailConfig;
    /** @var TranslationsService  */
    protected  $translations;

    public function __construct()
    {
        $this->email = \Config\Services::email();
        $this->emailConfig = $this->getConfiguration();
        $this->translations = new TranslationsService();
    }

    public function applyConfiguration(): void
    {
        $config = array(
            'protocol' => 'smtp',
            'SMTPHost' => $this->emailConfig->host,
            'SMTPPort' => $this->emailConfig->port,
            'SMTPUser' => $this->emailConfig->username,
            'SMTPPass' => $this->emailConfig->password,
            'SMTPCrypto' => 'tls',
            'CRLF' => "\r\n",
            'newline' => "\r\n",
//            'mailPath' => '/usr/sbin/sendmail',
            'wordWrap' => true,
            'charset' => 'UTF-8',
            'mailType' => 'html',
        );

        $this->email->initialize($config);
    }

    public function validateEmailAddress(string $address): bool
    {
        return filter_var($address, FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * @param $emailAddress
     * @param null $imageId
     * @throws \Exception
     */
    public function sendEmail($emailAddress, $imageId = null, $language = null): void
    {
        $this->applyConfiguration();

        $this->email->clear();
        $this->email->setTo($emailAddress);
        $this->email->setFrom($this->emailConfig->senderAddress);
        $this->setTranslatedContent($language ?? TranslationStructure::ENG_NAME);

        $imageModel = ImageModel::findOne($imageId);
        if ($imageModel instanceof ImageModel) {
            $fileUrl = $imageModel->getFullUrl();
            $this->email->attach($fileUrl, 'attachment', 'lvdm-' . $imageId . '.png');
        } else {
            throw new \Exception("Image not found");
        }

        $result = $this->email->send();

        if (!$result) {
            throw new \Exception($this->email->printDebugger());
        }
    }

    private function setTranslatedContent($language)
    {
        $subjectTransl = $this->translations->getTranslation('sharing.email-subject');
        $messageTransl = $this->translations->getTranslation('sharing.email-message');

        $this->email->setSubject($subjectTransl->getByLanguageName($language));
        $this->email->setMessage($messageTransl->getByLanguageName($language));
    }

    /**
     * @throws \Exception
     */
    public function testConnection(): void
    {
        $this->applyConfiguration();

        $this->email->clear();
        $this->email->setTo('kpudzens@gmail.com');
        $this->email->setFrom($this->emailConfig->senderAddress);
        $this->email->setSubject('Test message');
        $this->email->setMessage('Test content');
        $result = $this->email->send();

        if (!$result) {
            throw new \Exception($this->email->printDebugger());
        }
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