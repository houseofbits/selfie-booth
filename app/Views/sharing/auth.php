<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Selfie Booth Image sharing service</title>
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
            <img src="<?='/api/image/' . $imageId?>" class="card-img-top" alt="Image">
        </div>
    </div>
    <div class="fixed-overlay">
        <div class="container h-100">
            <div class="row align-items-center h-100">
                <div class="col-lg-6 col-sm-10 mx-auto text-center">
                    <h2 class="text-light">To share your image, please log in to yor Facebook account.</h2>
                    <h4 class="text-light">After login you will be redirected back here</h4>
                    <button type="button" class="btn btn-info">Log In</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/assets/fb.js"></script>
</body>
</html>
<?php
