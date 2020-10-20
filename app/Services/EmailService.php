<?php

namespace App\Services;

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

}