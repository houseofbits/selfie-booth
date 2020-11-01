<?php namespace Config;

$routes = Services::routes();

$routes->get('/', 'ApplicationController::index');

$routes->get('/admin', 'AdminController::index');

$routes->get('/admin/email', 'ConfigurationApiController::getEmailConfiguration');
$routes->post('/admin/email', 'ConfigurationApiController::saveEmailConfiguration');
$routes->post('/admin/email-test', 'ConfigurationApiController::sendEmailForTest');
$routes->get('/admin/sharing', 'ConfigurationApiController::getSharingConfiguration');
$routes->post('/admin/sharing', 'ConfigurationApiController::saveSharingConfiguration');
$routes->get('/admin/translations', 'ConfigurationApiController::getTranslationsList');
$routes->get('/admin/translation/(:any)', 'ConfigurationApiController::getTranslation/$1');
$routes->get('/admin/translation-save', 'ConfigurationApiController::saveTranslation');

$routes->post('/api/upload', 'ApiController::uploadImage');
$routes->get('/api/mail', 'ApiController::sendEmail');
$routes->get('/api/image/(:alphanum)', 'ApiController::serveImage/$1');
$routes->get('/api/qr/(:segment)/(:alphanum)', 'ApiController::getQRCode/$2/$1');
$routes->post('/api/validate', 'ApiController::validateEmail');