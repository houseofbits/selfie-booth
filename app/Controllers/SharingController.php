<?php namespace App\Controllers;

use App\Services\FacebookService;
use CodeIgniter\Controller;

class SharingController extends Controller
{
    private FacebookService $fbService;

    public function __construct()
    {
        $this->fbService = new FacebookService;
    }

	public function share($imageId)
	{
	    //Check if $imageId do exist and it is still valid
        //Save imageId in session

        try {
            $accessToken = $this->fbService->getAccessToken();
        } catch(\Exception $e) {
            return redirect()->to('/auth');
        }
        //If access token is still valid, go directly to Sharing view
        return redirect()->to('/share');
	}

	public function auth()
    {
        $authUrl = $this->fbService->getLoginUrl();
        return view('sharing/auth', ['authUrl' => $authUrl]);
    }

    public function authenticated()
    {

    }

    public function download()
    {

    }
}
