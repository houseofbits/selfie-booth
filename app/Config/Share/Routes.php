<?php namespace Config;

$routes = Services::routes();

$routes->get('/share/(:alpha)/(:alphanum)', 'SharingController::share/$1/$2');
$routes->get('/download/(:alpha)/(:alphanum)', 'SharingController::download/$1/$2');
$routes->get('/translations', 'ConfigurationApiController::getTranslationsResource');
$routes->get('/download', 'SharingController::downloadImage');

//$routes->get('/share', 'SharingController::authenticated');

//$routes->get('/download/(:alpha)/(:alphanum)', 'SharingController::download/$1/$2');
//$routes->post('/post', 'SharingController::postToFacebook');
//$routes->get('/auth/(:alpha)', 'SharingController::auth/$1');
$routes->get('/api/image/(:alphanum)', 'ApiController::serveImage/$1');
