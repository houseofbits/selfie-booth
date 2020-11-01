<?php

declare(strict_types=1);

namespace App\Structures;

class TranslationStructure
{
    const LAT = 0;
    const ENG = 1;
    const RUS = 2;

    const NAMES = [
        self::LAT => 'lat',
        self::ENG => 'eng',
        self::RUS => 'rus',
    ];

    public array $translations = [
        self::LAT => '',
        self::ENG => '',
        self::RUS => '',
    ];

    public function getDefault(): string
    {
        return $this->translations[self::ENG];
    }

    public function updateTranslation(string $text, int $lang)
    {
        if (isset($this->translations[$lang])) {
            $this->translations[$lang] = $text;
        }
    }
}