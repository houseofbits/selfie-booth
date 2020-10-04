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
<body>
<div class="container h-100 p-0">
    <div class="row p-1 pl-2 text-light bg-dark"><strong><i class="fas fa-camera"></i>  Selfie Photo Booth</strong></div>
    <div class="row h-100 border-left border-dark border-right border-bottom">
        <div class="col-md-2 bg-secondary p-1">
            <div class="btn-group-vertical btn-block">
				<a href="/admin" class="btn btn-secondary btn-sm <?=($segment=='')?'active':''?>">Preview</a>
                <a href="/admin/smtp" class="btn btn-secondary btn-sm <?=($segment=='smtp')?'active':''?>">Send in Email</a>
                <a href="/admin/content" class="btn btn-secondary btn-sm <?=($segment=='content')?'active':''?>">Facebook</a>
                <a href="/admin/log" class="btn btn-secondary btn-sm <?=($segment=='log')?'active':''?>">Log</a>                
            </div>     
        </div>
        <div class="col-md-10 bg-light p-0">
			<?= $this->renderSection('content') ?>
		</div>
    </div>
</div>
<script src="/assets/admin.js"></script>
</body>
</html>
