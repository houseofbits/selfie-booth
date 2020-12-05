<?php

declare(strict_types = 1);

namespace App\Models;

class SharingConfigModel extends FileStorageModel
{
    public bool $downloadEnabled = false;

    public bool $shareToFbEnabled = false;

    public string $publicAppDomain = '';

    public string $publicAppUrl = '';

    public string $fbAppId = '';

    public string $fbAppSecret = '';

    public int $shareableLinkTTL = 1440;

}