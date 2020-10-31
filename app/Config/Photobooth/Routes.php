<?php namespace Config;

$routes = Services::routes();

$routes->get('/', 'ApplicationController::index');

$routes->get('/admin', 'AdminController::index');
$routes->get('/admin/email', 'ConfigurationApiController::getEmailConfiguration');
$routes->post('/admin/email', 'ConfigurationApiController::saveEmailConfiguration');
$routes->post('/admin/email-test', 'ConfigurationApiController::sendEmailForTest');

//$routes->get('/admin/content', 'AdminController::emailEditor');
//$routes->get('/admin/log', 'AdminController::logHistory');

$routes->post('/api/upload', 'ApiController::uploadImage');
$routes->get('/api/mail', 'ApiController::sendEmail');
$routes->get('/api/image/(:alphanum)', 'ApiController::serveImage/$1');
$routes->get('/api/qr/(:segment)/(:alphanum)', 'ApiController::getQRCode/$2/$1');
$routes->post('/api/validate', 'ApiController::validateEmail');