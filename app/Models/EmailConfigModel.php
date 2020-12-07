<?php

declare(strict_types = 1);

namespace App\Models;

class EmailConfigModel extends FileStorageModel
{
    /** @var bool  */
    public $enabled = false;

    /** @var string  */
    public $host = '';

    /** @var string  */
    public $port = '';

    /** @var string  */
    public $username = '';

    /** @var string  */
    public $password = '';

    /** @var string  */
    public $senderAddress = '';

}