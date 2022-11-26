<?php

declare(strict_types=1);

namespace App\Structures;

class TranslationStructure
{
    public const LAT = 0;
    public const ENG = 1;
    public const RUS = 2;

    public const LAT_NAME = 'lv';
    public const ENG_NAME = 'en';
    public const RUS_NAME = 'ru';

    public const NAMES = [
        self::LAT => self::LAT_NAME,
        self::ENG => self::ENG_NAME,
        self::RUS => self::RUS_NAME,
    ];

    public const NAMES_TO_KEYS = [
        self::LAT_NAME => self::LAT,
        self::ENG_NAME => self::ENG,
        self::RUS_NAME => self::RUS,
    ];

    /** @var array|string[]  */
    public $translations = [
        self::LAT => '',
        self::ENG => '',
        self::RUS => '',
    ];

    public function getDefault(): string
    {
        return $this->translations[self::ENG];
    }

    public function getByLanguageName(string $lang)
    {
        return $this->translations[self::NAMES_TO_KEYS[$lang] ?? 100] ?? '';
    }

    public function updateTranslation(string $text, int $lang)
    {
        if (isset($this->translations[$lang])) {
            $this->translations[$lang] = $text;
        }
    }
}