<?php

declare(strict_types=1);

namespace App\Models;

use Exception;

class FileStorageModel
{
    public $id = null;

    public static function fullClassName(): string
    {
        return strtolower(preg_replace('/(?<!^)(\\\\?)([A-Z])/m', '_$2', self::class));
    }

    protected static function _getModelFileName($id): string
    {
        if ($id) {
            return self::fullClassName() . '_' . $id . ".ser";
        }

        return self::fullClassName() . ".ser";
    }

    public function save()
    {
        $paths = new \Config\Paths();

        $filePath = $paths->writeableModelsDirectory . '/' . self::_getModelFileName($this->id);

        $selfSerialized = serialize($this);

        if (file_put_contents($filePath, $selfSerialized) === false) {
            throw new Exception("Failed to write model file data");
        }
    }

    public function delete()
    {
        $paths = new \Config\Paths();

        $filePath = $paths->writeableModelsDirectory . '/' . self::_getModelFileName($this->id);

        if (is_file($filePath)) {
            if (unlink($filePath) === false) {
                throw new Exception("Failed to delete model file");
            }
        } else {
            throw new Exception("Model file not found");
        }
    }

    public static function findOne($id = null)
    {
        $paths = new \Config\Paths();

        $filePath = $paths->writeableModelsDirectory . '/' . self::_getModelFileName($id);

        if (is_file($filePath)) {
            $data = file_get_contents($filePath);

            $selfUnserialized = unserialize($data);

            if ($selfUnserialized instanceof self) {
                return $selfUnserialized;
            }
        }
        return null;
    }

    public static function findAll(): array
    {
        $objects = [];

        $paths = new \Config\Paths();

        if ($handle = opendir($paths->writeableModelsDirectory)) {
            while (false !== ($entry = readdir($handle))) {
                if (preg_match('/' . self::fullClassName() . '/i', $entry)) {
                    $filePath = $paths->writeableModelsDirectory . '/' . $entry;
                    if (is_file($filePath)) {
                        $data = file_get_contents($filePath);

                        $selfUnserialized = unserialize($data);

                        if ($selfUnserialized instanceof self) {
                            $objects[] = $selfUnserialized;
                        }
                    }
                }
            }

            closedir($handle);
        }

        return $objects;
    }
}