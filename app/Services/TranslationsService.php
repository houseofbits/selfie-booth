<?php

namespace App\Services;

use App\Models\TranslationsModel;
use App\Structures\TranslationsListItemResponseStructure;
use App\Structures\TranslationStructure;
use CodeIgniter\HTTP\Request;
use Exception;

class TranslationsService
{
    public function getTranslations(): TranslationsModel
    {
        return TranslationsModel::findOrCreate();
    }

    public function getTranslation(string $key): TranslationStructure
    {
        return TranslationsModel::findOrCreate()->findOrCreateTranslation($key);
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

    /**
     * @param Request $request
     * @throws Exception
     */
    public function saveTranslation(Request $request): void
    {
        $translationsModel = TranslationsModel::findOrCreate();
        $key = $request->getVar('key');
        $textLat = $request->getVar('textLV') ?? '';
        $textEng = $request->getVar('textEN') ?? '';
        $textRus = $request->getVar('textRU') ?? '';

        if (!$key) {
            throw new Exception("Key is not defined");
        }
        $translationsModel->updateTranslation($key, $textLat, TranslationStructure::LAT);
        $translationsModel->updateTranslation($key, $textEng, TranslationStructure::ENG);
        $translationsModel->updateTranslation($key, $textRus, TranslationStructure::RUS);
        $translationsModel->save();
    }

    public function createTranslationKey(string $key)
    {
        $translationsModel = TranslationsModel::findOrCreate();
        $translationsModel->insertTranslationKey($key);
        $translationsModel->save();
    }
}