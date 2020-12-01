<?php

namespace App\Services;

use Facebook\Authentication\AccessToken;
use Facebook\Exceptions\FacebookSDKException;
use Facebook\Facebook;

class FacebookService
{
    public Facebook $fb;

    public function __construct()
    {
        $this->fb = new Facebook(
            [
                'app_id' => '***',
                'app_secret' => '***',
                'default_graph_version' => 'v2.3',
            ]
        );
    }

    /**
     * @return AccessToken
     * @throws FacebookSDKException
     * @throws \Exception
     */
    public function getAccessToken(): AccessToken
    {
        $helper = $this->fb->getRedirectLoginHelper();

        $accessToken = $helper->getAccessToken();

        if(!$accessToken) {
            throw new \Exception("Access token is null");
        }

        return $accessToken;
    }

    public function getLoginUrl(): string
    {
        $helper = $this->fb->getRedirectLoginHelper();

        $permissions = [];  //['email'];
        return $helper->getLoginUrl('https://example.com/fb-callback.php', $permissions);
    }
}