<?php

namespace App\Services;

class ImageService
{   
    public string $publicAppUrl = "https://www.kautkaadalapa.lv/atteelushaariite/{TYPE}/{ID}";
    
    public function __construct()
    {

    }

    public function createImage(string $path): ?string
    {
        $imageModel = new ImageModel();
        $imageModel->imageUrl = $path;
        $imageModel->createdAt = time();

        try {
            $imageModel->save();
        } catch (Exception $e) {
            return null;
        }
        return $imageModel->id;
    }

    public function getImageData(string $id): ?array
    {
        $imageModel = ImageModel::findOne($id);
        if ($imageModel instanceof ImageModel) {
            
            //TODO: move path def to model
            $file = new File(WRITEPATH . 'uploads' . DIRECTORY_SEPARATOR . $imageModel->imageUrl);

            $fileData = $file->openFile('r');

            $contents = $fileData->fread($fileData->getSize());
            
            //TODO: create structure
            return [
              $file->getMimeType(),
              $contents
            ];
        }
        return null;
    }
    
    public function getQrCodeForPublicApp(string $imageId, string $type): ?array
    {
        $imageModel = ImageModel::findOne($id);
        if ($imageModel instanceof ImageModel) {
            $qrCode = new QrCode('https://www.somerandomwebpage.lv/atteelushariite/' . $type . '/' . $imageModel->id);

            //TODO: same structure
            return [
              $qrCode->getContentType(),
              $qrCode->writeString()
            ];                
        }
    }
}



