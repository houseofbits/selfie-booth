<?php

declare(strict_types = 1);

namespace App\Models;

class EmailConfigModel extends FileStorageModel
{
    public bool $enabled = false;

    public string $host = '';

    public string $port = '';

    public string $username = '';

    public string $password = '';

    public string $senderAddress = '';

}