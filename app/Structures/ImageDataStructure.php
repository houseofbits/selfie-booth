<?php

declare(strict_types=1);

namespace App\Structures;

class ImageDataStructure
{   
    public string $mimeType;
    public string $data;

    public function __construct(string $mimeType, string $data)
    {
      $this->mimeType = $mimeType;
      $this->data = $data;
    }
}
