<?php

declare(strict_types=1);

namespace App\Models;

use App\Structures\TranslationStructure;

class TranslationsModel extends FileStorageModel
{
    /**
     * @var TranslationStructure[]
     */
    public array $translations = [];

    public function updateTranslation(
        string $key,
        string $text,
        int $lang = TranslationStructure::ENG
    ): TranslationStructure {
        $translationStruct = $this->findOrCreate($key);
        $translationStruct->updateTranslation($text, $lang);
        $this->translations[$key] = $translationStruct;
        return $translationStruct;
    }

    public function findOrCreate(string $key): TranslationStructure
    {
        return $this->translations[$key] ?? new TranslationStructure();
    }
}