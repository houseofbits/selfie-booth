<?php namespace App\Controllers;

use CodeIgniter\Controller;

class AdminController extends Controller
{
	public function index()
	{
		log_message('critical', "TEst error");

		$segment = $this->request->uri->getSegment(2);

		return view('admin/main', \compact('segment'));
	}

	public function smtpSettings()
	{
		$segment = $this->request->uri->getSegment(2);

		return view('admin/smtp', \compact('segment'));
	}

	public function emailEditor()
	{
		$segment = $this->request->uri->getSegment(2);

		return view('admin/facebook', \compact('segment'));
	}

	public function logHistory()
	{
		$segment = $this->request->uri->getSegment(2);

		return view('admin/log', \compact('segment'));
	}
}
