<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=transl('sharing.title')?></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
    <link rel="stylesheet" href="/assets/fb.css">
</head>
<body>

<div class="container h-100">
    <div class="fixed-overlay bg-secondary"></div>
    <div class="row align-items-center h-100">
        <div class="col-12 mx-auto">
            <img src="<?= '/api/image/' . $imageId ?>" class="card-img-top" alt="Image">
        </div>
    </div>
    <div class="fixed-overlay">
        <div class="container h-100">
            <div class="row align-items-center h-100">
                <div class="col-lg-6 col-sm-10 mx-auto text-center">

                    <?php

                    $download = $downloadOnly ?? false;
                    $hasUser = $authenticated ?? false;

                    if(!$download && !$hasUser){

                        echo view('sharing/partials/auth', compact('authUrl'));

                        echo '<hr class="divider">';

                    } elseif (!$download && $hasUser) {

                        echo view('sharing/partials/share');

                        echo '<hr class="divider">';
                    }

                    echo view('sharing/partials/download');

                    ?>

                    <h5 class="text-light mt-2 text-shadow-1">
                        <?=transl('sharing.page-available')?> <?=$timeLeft??''?>
                    </h5>

                </div>
            </div>
        </div>
    </div>
</div>
<script src="/assets/fb.js"></script>
</body>
</html>
<?php
