<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use Config\Services;

class AdminController extends Controller
{
    /**
     * @var bool
     */
    private $isAuth = false;

    private const password = '52ce570a2f471a01c37bef8f08eace81';

    /**
     * @var \CodeIgniter\Session\Session
     */
    private $session = null;

    public function __construct()
    {
        helper('form');

        $this->session = Services::session();

        $this->isAuth = $this->session->getTempdata('auth') ?? false;
    }

	public function index()
	{
        return $this->isAuth ? view('admin/index') : view('admin/auth');
	}

	public function auth()
    {
        $password = $this->request->getVar('password');
        if (md5($password) === self::password) {
            $this->session->setTempdata('auth', true, 300);
        }
        $this->response->redirect('/admin');
    }

    public function logout()
    {
        $this->session->removeTempdata('auth');
        $this->response->redirect('/admin');
    }
}
