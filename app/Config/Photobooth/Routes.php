<?php namespace Config;

$routes = Services::routes();

$routes->get('/', 'ApplicationController::index');

$routes->get('/admin', 'AdminController::index');

$routes->get('/conf/email', 'ConfigurationApiController::getEmailConfiguration');
$routes->post('/conf/email', 'ConfigurationApiController::saveEmailConfiguration');
$routes->post('/conf/email-test', 'ConfigurationApiController::sendEmailForTest');
$routes->get('/conf/sharing', 'ConfigurationApiController::getSharingConfiguration');
$routes->post('/conf/sharing', 'ConfigurationApiController::saveSharingConfiguration');
$routes->get('/conf/translations', 'ConfigurationApiController::getTranslationsList');
$routes->get('/conf/translation/(:any)', 'ConfigurationApiController::getTranslation/$1');
$routes->post('/conf/translation-save', 'ConfigurationApiController::saveTranslation');
$routes->get('/translations', 'ConfigurationApiController::getTranslationsResource');
$routes->get('/conf/images', 'ConfigurationApiController::getAllImages');
$routes->post('/conf/image-delete', 'ConfigurationApiController::deleteImage');

$routes->cli('cli/translate/(:any)', 'ConfigurationApiController::cliCreateTranslationKey/$1');

$routes->post('/api/upload', 'ApiController::uploadImage');
$routes->post('/api/mail', 'ApiController::sendEmail');
$routes->get('/api/image/(:alphanum)', 'ApiController::serveImage/$1');
$routes->get('/api/qr/(:segment)/(:alphanum)', 'ApiController::getQRCode/$2/$1');
$routes->post('/api/validate', 'ApiController::validateEmail');

//Sharing app routes. Copy to Facebook/Routes.php
$routes->get('/share', 'SharingController::authenticated');
$routes->get('/share/(:alphanum)', 'SharingController::share/$1');
$routes->get('/auth', 'SharingController::auth');
$routes->get('/download', 'SharingController::download');
