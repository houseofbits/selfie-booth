<?php namespace App\Controllers;

use CodeIgniter\Controller;

class FacebookController extends Controller
{
	public function index()
	{
		return view('facebook/index');
	}
}
