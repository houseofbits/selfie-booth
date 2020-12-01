<?php

namespace App\Structures;

use App\Models\ImageModel;

class ImageInfoStructure
{
    public string $id;
    public string $dateCreated;

    public function __construct(ImageModel $model){
        $this->id = (string)$model->id;
        $this->dateCreated = date('Y-m-d H:i:s', $model->createdAt);
    }
}