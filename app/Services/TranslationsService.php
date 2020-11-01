<?php

namespace App\Services;

use App\Models\TranslationsModel;
use App\Structures\TranslationsListItemResponseStructure;
use App\Structures\TranslationStructure;

class TranslationsService
{
    public function getTranslations(): TranslationsModel
    {
        $translationsModel = TranslationsModel::findOne();
        if (!$translationsModel) {
            $translationsModel = new TranslationsModel();
        }

        $translationsModel->updateTranslation('test-key-0', "Test translation");
        $translationsModel->updateTranslation('test-key-1', "Test translation 1");
        $translationsModel->updateTranslation('test-key-2', "Test translation 2");

        return $translationsModel;
    }

    public function getTranslation(string $key): TranslationStructure
    {
        $translationsModel = TranslationsModel::findOne();
        if (!$translationsModel) {
            $translationsModel = new TranslationsModel();
        }

        $translationsModel->updateTranslation('test-key-0', "Test translation");
        $translationsModel->updateTranslation('test-key-1', "Test translation 1");
        $translationsModel->updateTranslation('test-key-2', "Test translation 2");

        return $translationsModel->findOrCreate($key);
    }

    /**
     * @return TranslationsListItemResponseStructure[]
     */
    public function getTranslationsListResponse(): array
    {
        $translations = $this->getTranslations();
        if ($translations) {
            return array_map(
                fn(TranslationStructure $translation, $key) => new TranslationsListItemResponseStructure(
                    $key,
                    $translation->getDefault()
                ),
                $translations->translations,
                array_keys($translations->translations)
            );
        }
        return [];
    }
}