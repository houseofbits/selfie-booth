<?php

namespace App\Controllers;

use CodeIgniter\CLI\CLI;
use CodeIgniter\Controller;

class Cron extends Controller
{
	public function index()
	{
        CLI::write('Selfie-booth temporary data deleted!', 'black', 'green');

        //TODO:
        // 1) Delete session data
        // 2) Delete outdated images

        return '';
	}
}
