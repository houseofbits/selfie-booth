<?php

declare(strict_types=1);

namespace App\Models;

use Exception;

class FileStorageModel
{
    public $id = null;
    public bool $GENERATE_ID = false;
    public int $GENERATED_ID_LENGTH = 8;

    public function __construct()
    {
        if ($this->GENERATE_ID) {
            $this->id = self::generateId($this->GENERATED_ID_LENGTH);
        }
    }

    public static function fullClassName(): string
    {
        return strtolower(preg_replace('/(?<!^)(\\\\?)([A-Z])/m', '_$2', static::class));
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

    public static function findOrCreate($id = null)
    {
        $model = self::findOne($id);
        if (!$model) {
            $model = new static;
        }
        return $model;
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

    public static function generateId($length = 8)
    {
        $paths = new \Config\Paths();
        $try = 0;
        while ($try < 20) {
            $id = substr(md5(uniqid(mt_rand() . microtime(), true)), 0, $length);
            $filePath = $paths->writeableModelsDirectory . '/' . self::_getModelFileName($id);
            if (!is_file($filePath)) {
                return $id;
            }
            $try++;
        }
    }
}