<?php namespace Config;

$routes = Services::routes();

$routes->get('/share', 'SharingController::index');
