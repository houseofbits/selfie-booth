<?php

declare(strict_types=1);

namespace App\Models;

use Exception;

class ImageModel extends FileStorageModel
{
    public bool $GENERATE_ID = true;

    public int $GENERATED_ID_LENGTH = 6;

    public string $imageUrl;

    public int $createdAt;

    public function delete()
    {
        try {
            if (unlink(WRITEPATH . 'uploads' . DIRECTORY_SEPARATOR . $this->imageUrl)) {
                parent::delete();
            }
        } catch (Exception $e) {
        }
    }
}