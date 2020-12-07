<?php

declare(strict_types=1);

namespace App\Structures;

class TranslationsListItemResponseStructure
{
    /** @var string  */
    public $key;

    /** @var string  */
    public $defaultText;

    public function __construct($key, $value){
        $this->key = $key;
        $this->defaultText = $value;
    }
}