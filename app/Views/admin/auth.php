<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Selfie Booth</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
    <link rel="stylesheet" href="/assets/admin.css">
</head>
<body class="container d-flex justify-content-center">
<div class="align-self-center col-md-4 text-center mt-3 bg-dark p-4 text-light">
    <form action="/admin/auth" method="post" accept-charset="utf-8">
        <h1 class="h3 mb-3 font-weight-normal">Selfie Photo Booth</h1>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
        <button type="submit" class="btn btn-success mt-3">Log-in</button>
    </form>
</div>
</body>
</html>
<?php
