<?php namespace Config;

$routes = Services::routes();

$routes->get('/', 'ApplicationController::index');
$routes->get('/admin', 'AdminController::index');
$routes->get('/admin/smtp', 'AdminController::smtpSettings');
$routes->get('/admin/content', 'AdminController::emailEditor');
$routes->get('/admin/log', 'AdminController::logHistory');

$routes->post('/api/upload', 'ApiController::uploadImage');
$routes->get('/api/mail', 'ApiController::sendEmail');
$routes->get('/api/image/(:alphanum)', 'ApiController::serveImage/$1');
$routes->get('/api/qr/(:alphanum)', 'ApiController::getQRCode/$1');
