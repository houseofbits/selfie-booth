<?php namespace App\Controllers;

use CodeIgniter\Controller;

class ApplicationController extends Controller
{
	public function index()
	{
		return view('app');
	}
}
