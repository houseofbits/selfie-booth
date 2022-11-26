<?php

declare(strict_types=1);

namespace App\Structures;

class ImageDataStructure
{
    /** @var string  */
    public $mimeType;

    /** @var string  */
    public $data;

    public function __construct(string $mimeType, string $data)
    {
      $this->mimeType = $mimeType;
      $this->data = $data;
    }
}
