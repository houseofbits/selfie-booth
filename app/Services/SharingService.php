<?php

namespace App\Services;

use App\Models\SharingConfigModel;
use CodeIgniter\HTTP\Request;

class SharingService
{
    public function getConfiguration(): SharingConfigModel
    {
        return SharingConfigModel::findOrCreate();
    }

    /**
     * @param Request $request
     * @throws \Exception
     */
    public function saveConfiguration(Request $request): void
    {
        $sharingModel = SharingConfigModel::findOrCreate();
        $sharingModel->downloadEnabled = $request->getVar('downloadEnabled', FILTER_VALIDATE_BOOLEAN) ?? false;
        $sharingModel->shareToFbEnabled = $request->getVar('shareToFbEnabled', FILTER_VALIDATE_BOOLEAN) ?? false;

        $sharingModel->publicAppUlr = $request->getVar('publicAppUrl') ?? '';
        $sharingModel->fbAppId = $request->getVar('fbAppId') ?? '';
        $sharingModel->fbAppSecret = $request->getVar('fbAppSecret') ?? '';

        $sharingModel->save();
    }
}