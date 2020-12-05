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
        $translationStruct = $this->findOrCreateTranslation($key);
        $translationStruct->updateTranslation($text, $lang);
        $this->translations[$key] = $translationStruct;
        return $translationStruct;
    }

    public function findOrCreateTranslation(string $key): TranslationStructure
    {
        return $this->translations[$key] ?? new TranslationStructure();
    }

    public function insertTranslationKey(string $key)
    {
        $this->translations[$key] = $this->findOrCreateTranslation($key);
    }

    public function getTranslation(string $key, string $lang): string
    {
        if (in_array($lang, TranslationStructure::NAMES_TO_KEYS)) {
            $structure = $this->findOrCreateTranslation($key);
            $str = $structure->getByLanguageName($lang);
            if (!empty($str)) {
                return $str;
            }
        }
        return $key;
    }
}