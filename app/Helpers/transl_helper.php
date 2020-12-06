<?php

use Config\Services;

if (!function_exists('transl')) {
    function transl(string $key = '', string $lang = null): string
    {
        $uri = uri_string();
        $result = preg_match_all("/\/(lv|en|ru)(\/|$)/i", $uri, $match);
        if (!$lang && $result) {
            $lang = $match[1][0];
        }
        return Services::translations()->getTranslation($key, $lang);
    }
}