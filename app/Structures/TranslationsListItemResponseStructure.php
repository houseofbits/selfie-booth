<?php

declare(strict_types=1);

namespace App\Structures;

class TranslationsListItemResponseStructure
{
    public function __construct($key, $value){
        $this->key = $key;
        $this->defaultText = $value;
    }
    public string $key;
    public string $defaultText;
}