<?php

declare(strict_types=1);

namespace App\Models;

use Exception;

class ImageModel extends FileStorageModel
{
    /** @var bool  */
    public $GENERATE_ID = true;

    /** @var int  */
    public $GENERATED_ID_LENGTH = 6;

    /** @var string  */
    public $imageUrl;

    /** @var int  */
    public $createdAt;

    public function delete()
    {
        try {
            if (unlink($this->getFullUrl())) {
                parent::delete();
            }
        } catch (Exception $e) {
        }
    }

    public function getFullUrl(): string
    {
        return WRITEPATH . 'uploads' . DIRECTORY_SEPARATOR . $this->imageUrl;
    }
}