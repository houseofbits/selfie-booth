<?php

declare(strict_types = 1);

namespace App\Models;

class SharingConfigModel extends FileStorageModel
{
    public bool $downloadEnabled = false;

    public bool $shareToFbEnabled = false;

    public string $publicAppUlr = '';

}