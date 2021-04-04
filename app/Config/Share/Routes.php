<?php namespace Config;

$routes = Services::routes();

$routes->get('/share/(:alpha)/(:alphanum)', 'SharingController::share/$1/$2');
$routes->get('/download/(:alpha)/(:alphanum)', 'SharingController::download/$1/$2');
$routes->get('/translations', 'ConfigurationApiController::getTranslationsResource');
$routes->get('/download', 'SharingController::downloadImage');
$routes->get('/api/image/(:alphanum)', 'ApiController::serveImage/$1');
