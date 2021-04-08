<?php

namespace App\Controllers;

use App\Services\ImageService;
use CodeIgniter\CLI\CLI;
use CodeIgniter\Controller;

class Cron extends Controller
{
	public function index()
	{
        $imageService = new ImageService();
        $imageService->cleanUpImages();

        CLI::write('Selfie-booth temporary data deleted!', 'black', 'green');

        return '';
	}
}
