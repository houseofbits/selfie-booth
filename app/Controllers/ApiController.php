<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\EmailConfigModel;
use App\Models\ImageModel;
use CodeIgniter\Files\File;
use CodeIgniter\HTTP\Exceptions\HTTPException;
use CodeIgniter\RESTful\ResourceController;
use Endroid\QrCode\QrCode;
use Exception;

class ApiController extends ResourceController
{
    protected $format = 'json';

    public function sendEmail()
    {
//        $emailModel = new EmailConfigModel();
//
//        $emailModel->enabled = true;
//        $emailModel->host = '0.0.0.0';
//        $emailModel->username = 'test';
//
//        $emailModel->save();

        //var_dump($emailModel);

//        $emailModelLoaded = EmailConfigModel::findOne();
//        if ($emailModelLoaded) {
//            $emailModelLoaded->delete();
//        }
//
        //var_dump(EmailConfigModel::generateId());
        //var_dump(EmailConfigModel::findAll());

//        $imageModel = new ImageModel();
//        $imageModel->imageUrl = "lol";
//        $imageModel->createdAt = time();
//

        //$imageModel = ImageModel::findOne('219d43');

        //var_dump($imageModel);

        //$imageModel->delete();

//        $imageModel->save();

    }

    public function uploadImage()
    {
        try {
            $path = $this->request->getFile('image')->store("images");
        } catch (HTTPException $e) {
            return $this->failNotFound($e->getMessage());
        }

        $imageModel = new ImageModel();
        $imageModel->imageUrl = $path;
        $imageModel->createdAt = time();

        try {
            $imageModel->save();
        } catch (Exception $e) {
            return $this->failNotFound($e->getMessage());
        }

        return $this->respond(['id' => $imageModel->id]);
    }

    public function getQRCode(string $id)
    {
        $imageModel = ImageModel::findOne($id);
        if ($imageModel instanceof ImageModel) {

            $qrCode = new QrCode('https://www.somerandomwebpage.lv/atteelushariite/' . $imageModel->id);

            return $this->response->setHeader('Content-Type', $qrCode->getContentType())
                ->setBody($qrCode->writeString());
        }
        return $this->response->setStatusCode(404, 'Image not found!');
    }

    public function dropExpiredImages()
    {
        //TODO
    }

    public function serveImage(string $id)
    {
        $imageModel = ImageModel::findOne($id);
        if ($imageModel instanceof ImageModel) {
            $file = new File(WRITEPATH . 'uploads' . DIRECTORY_SEPARATOR . $imageModel->imageUrl);

            $fileData = $file->openFile('r');

            $contents = $fileData->fread($fileData->getSize());

            return $this->response->setHeader('Content-Type', $file->getMimeType())
                ->setBody($contents);
        }
        return $this->response->setStatusCode(404, 'Image not found!');
    }
}
