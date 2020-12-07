<?php

declare(strict_types = 1);

namespace App\Models;

class SharingConfigModel extends FileStorageModel
{
    /** @var bool  */
    public $downloadEnabled = false;

    /** @var bool  */
    public $shareToFbEnabled = false;

    /** @var string  */
    public $publicAppDomain = '';

    /** @var string  */
    public $publicAppUrl = '';

    /** @var string  */
    public $fbAppId = '';

    /** @var string  */
    public $fbAppSecret = '';

    /** @var int  */
    public $shareableLinkTTL = 1440;

}