<?php namespace Config;

$routes = Services::routes();

$routes->get('/api/image/(:alphanum)', 'ApiController::serveImage/$1');
$routes->get('/share', 'SharingController::authenticated');
$routes->get('/share/(:alphanum)', 'SharingController::share/$1');
$routes->get('/auth', 'SharingController::auth');
$routes->get('/download', 'SharingController::download');