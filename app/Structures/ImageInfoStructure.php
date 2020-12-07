<?php

namespace App\Structures;

use App\Models\ImageModel;

class ImageInfoStructure
{
    /** @var string  */
    public $id;

    /** @var false|string  */
    public $dateCreated;

    public function __construct(ImageModel $model){
        $this->id = (string)$model->id;
        $this->dateCreated = date('Y-m-d H:i:s', $model->createdAt);
    }
}