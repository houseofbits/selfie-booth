<?php namespace Config;

$routes = Services::routes();

$routes->get('/', 'FacebookController::index');
