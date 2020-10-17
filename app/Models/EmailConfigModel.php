<?php

declare(strict_types = 1);

namespace App\Models;

class EmailConfigModel extends FileStorageModel
{
    public bool $enabled;

    public string $host;

    public string $username;

    public string $password;

}