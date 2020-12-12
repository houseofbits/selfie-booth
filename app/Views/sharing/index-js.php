<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>Hello FB</title>
</head>
<body>
<!--<div id="fb-root"></div>-->
<!--<div id="fb-content"></div>-->
<!--<div>-->
<!--    <a href="#" id="upload-trigger" onClick="javascript:fileUpload();">File Upload!</a>-->
<!--    <form id="upload-photo-form" target="upload_iframe" method="post" enctype="multipart/form-data">-->
<!--        <input id="upload-photo-form-file" name="file" size="27" type="file" />-->
<!--    </form>-->
<!--    <iframe id="upload_iframe" name="upload_iframe" witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>-->
<!--</div>-->

<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/lv_LV/sdk.js#xfbml=1&version=v9.0&appId=1068766546928432&autoLogAppEvents=1" nonce="q5zIlyJT"></script>
<script>

    let isAuthenticated = false;

    window.fbAsyncInit = function() {
        FB.init({
            appId: '407251443963337',
            cookie: true,
            xfbml: true,
            version: 'v6.0'
        });
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                console.log('Logged in user');
                isAuthenticated = true;
            } else {
                console.log('Not logged in user');
                isAuthenticated = false;
            }
        });
    }

    function authenticate()
    {
        if(!isAuthenticated){
            FB.login(function(response){

                console.log(response);

            }, {scope: 'pages_manage_posts'});
        }else{
            alert('Already logged in');
        }
    }

    function fbLogoutUser() {
        FB.getLoginStatus(function(response) {
            if (response && response.status === 'connected') {
                FB.logout(function(response) {
                    document.location.reload();
                });
            }
        });
    }

    function postImage() {

        console.log('Try and share something');

        var wallPost = {
            message: "Test to post a photo",
            url: "http://www.photographyblogger.net/wp-content/uploads/2010/05/flower29.jpg"
        };
        FB.api('/me/photos', 'post', wallPost , function(response) {
            if (!response || response.error) {
                alert('Failure! ' + response.status + ' You may logout once and try again');
            } else {
                console.log('Good');
            }
            console.log(response);
        });

    }
</script>

<!---->
<!--<div class="fb-login-button" data-size="large" data-button-type="continue_with" data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>-->

<button onclick="authenticate()">Log in</button>
<button onclick="fbLogoutUser()">Log out</button>
<button onclick="postImage()">Share something</button>

<!--<script>-->
<!--    window.fbAsyncInit = function() {-->
<!--        FB.init({-->
<!--            appId      : '1068766546928432',-->
<!--            cookie     : true,-->
<!--            xfbml      : true,-->
<!--            version    : 'v9.0'-->
<!--        });-->
<!---->
<!--        //FB.AppEvents.logPageView();-->
<!---->
<!--        FB.getLoginStatus(function(response) {-->
<!--            if (response.status === 'connected') {-->
<!---->
<!--                console.log('Logged in user');-->
<!---->
<!--                console.log(response);-->
<!---->
<!--            } else {-->
<!---->
<!--                console.log('Try to login');-->
<!---->
<!--                FB.login(function(response){-->
<!---->
<!--                    console.log(response);-->
<!---->
<!--                });-->
<!--            }-->
<!--        });-->
<!---->
<!--        function postImage() {-->
<!--            var wallPost = {-->
<!--                message: "Test to post a photo",-->
<!--                picture: "http://www.photographyblogger.net/wp-content/uploads/2010/05/flower29.jpg"-->
<!--            };-->
<!--            FB.api('/me/feed', 'post', wallPost , function(response) {-->
<!--                if (!response || response.error) {-->
<!--                    alert('Failure! ' + response.status + ' You may logout once and try again');-->
<!--                } else {-->
<!--                    alert('Success! Post ID: ' + response);-->
<!--                }-->
<!--            });-->
<!--        }-->
<!---->
<!--    };-->
<!---->
<!--    (function(d, s, id){-->
<!--        var js, fjs = d.getElementsByTagName(s)[0];-->
<!--        if (d.getElementById(id)) {return;}-->
<!--        js = d.createElement(s); js.id = id;-->
<!--        js.src = "https://connect.facebook.net/en_US/sdk.js";-->
<!--        fjs.parentNode.insertBefore(js, fjs);-->
<!--    }(document, 'script', 'facebook-jssdk'));-->
<!--</script>-->


<!--<script type="application/javascript">-->
<!--    var accessToken;-->
<!--    window.fbAsyncInit = function(){-->
<!--        FB.init({-->
<!--            appId: 1068766546928432,-->
<!--            status: true,-->
<!--            cookie: true,-->
<!--            oauth: true,-->
<!--            xfbml: true-->
<!--        });-->
<!--        FB.getLoginStatus(function(response){-->
<!--            if (response.status == 'connected') {-->
<!--                accessToken = response.authResponse.accessToken;-->
<!--                doSomething();-->
<!--            }-->
<!--            else {-->
<!--                FB.login(function(response){-->
<!--                    if (response.status == 'connected') {-->
<!--                        accessToken = response.authResponse.accessToken;-->
<!--                        doSomething();-->
<!--                    }-->
<!--                    else {-->
<!--                        alert("Bye.");-->
<!--                    }-->
<!--                }, {scope:'publish_stream,user_photos,friends_photos,user_photo_video_tags,friends_photo_video_tags'});-->
<!--            }-->
<!--        });-->
<!--    };-->
<!--    // CHOOSE WHAT YOU WANT TO DO. THIS FUNCTION IS CALLED AUTOMATICALLY ON PAGE LOADING-->
<!--    function doSomething() {-->
<!--//  postImage1();-->
<!--//  postFeed();-->
<!--//  showFriends();-->
<!--    }-->
<!--    // UPLOAD A LOCAL IMAGE FILE, BUT THIS CAN NOT BE DONE WITHOUT USER'S MANUAL OPERATION BECAUSE OF SECURITY REASONS-->
<!--    function fileUpload() {-->
<!--        FB.api('/me/albums', function(response) {-->
<!--            var album = response.data[0]; // Now, upload the image to first found album for easiness.-->
<!--            var action_url = 'https://graph.facebook.com/' + album.id + '/photos?access_token=' +  accessToken;-->
<!--            var form = document.getElementById('upload-photo-form');-->
<!--            form.setAttribute('action', action_url);-->
<!---->
<!--            // This does not work because of security reasons. Choose the local file manually.-->
<!--            // var file = document.getElementById('upload-photo-form-file');-->
<!--            // file.setAttribute('value', "/Users/nseo/Desktop/test_title_03.gif")-->
<!---->
<!--            form.submit();-->
<!--        });-->
<!--    }-->
<!--    // POST A IMAGE WITH DIALOG using FB.api-->
<!--    function postImage1() {-->
<!--        var wallPost = {-->
<!--            message: "Test to post a photo",-->
<!--            picture: "http://www.photographyblogger.net/wp-content/uploads/2010/05/flower29.jpg"-->
<!--        };-->
<!--        FB.api('/me/feed', 'post', wallPost , function(response) {-->
<!--            if (!response || response.error) {-->
<!--                alert('Failure! ' + response.status + ' You may logout once and try again');-->
<!--            } else {-->
<!--                alert('Success! Post ID: ' + response);-->
<!--            }-->
<!--        });-->
<!--    }-->
<!--    // POST A FEED WITH DIALOG using FB.ui-->
<!--    function postFeed() {-->
<!--        FB.ui(-->
<!--            {-->
<!--                method: 'feed',-->
<!--                name: 'Facebook Dialogs',-->
<!--                link: 'http://developers.facebook.com/docs/reference/dialogs/',-->
<!--                picture: 'http://fbrell.com/f8.jpg',-->
<!--                caption: 'Reference Documentation',-->
<!--                description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'-->
<!--            },-->
<!--            function(response) {-->
<!--                if (response && response.post_id) {-->
<!--                    alert('Succeeded to post');-->
<!--                }-->
<!--                else {-->
<!--                    alert('Failed to post');-->
<!--                }-->
<!--            }-->
<!--        );-->
<!--    }-->
<!--    // GET MY FRIEND LIST using FB.api (Just a copy from somewhere)-->
<!--    function showFriends() {-->
<!--        FB.api('/me/friends', function(response){-->
<!--            var ul = document.createElement('ul');-->
<!--            for (var i = 0; i < response.data.length; i++) {-->
<!--                var li = document.createElement('li');-->
<!--                response.data[i].img = function() {-->
<!--                    return '<img src="http://graph.facebook.com/' + this.id + '/picture" />'-->
<!--                }-->
<!--                li.innerHTML = response.data[i].img() + response.data[i].name;-->
<!--                ul.appendChild(li);-->
<!--            }-->
<!--            document.getElementById('fb-content').appendChild(ul);-->
<!--        });-->
<!--    }-->
<!--    (function(){-->
<!--        var e = document.createElement('script');-->
<!--        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';-->
<!--        e.async = true;-->
<!--        document.getElementById('fb-root').appendChild(e);-->
<!--    }());-->
<!--</script>-->
</body>
</html>
