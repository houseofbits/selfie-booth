<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
    <link rel="stylesheet" href="/assets/main.css">
<!--    <style>-->
<!--        .wrapper {-->
<!--            transform: rotate(90deg);-->
<!--            transform-origin: bottom left;-->
<!---->
<!--            position: absolute;-->
<!--            top: -100vw;-->
<!--            left: 0;-->
<!---->
<!--            height: 100vw;-->
<!--            width: 100vh;-->
<!---->
<!--            background-color: #000;-->
<!--            color: #fff;-->
<!---->
<!--        }-->
<!--    </style>-->
</head>
<body>
<div class='wrapper'>
    <canvas id="captureCanvas"
            style="width:1080px; height:1920px; z-index:-2;position:absolute;left:1080px;top:0;"></canvas>
    <canvas id="renderCanvas" style="width:1080px; height:1920px; z-index:-1;position:absolute;left:0;top:0;"></canvas>
    <div id="gui"></div>
    <script src="/assets/main.js"></script>
</div>
</body>
</html>
