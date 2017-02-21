$(document).ready(function(){
    /*localStorage.removeItem('result');*/
    /*localStorage.clear();*/
    /*alert("aaaaa");*/
    var response = JSON.parse(localStorage.getItem('result'));
    if (response != null) {
        /*$('div#login').attr('id','login-new');
        $('#login-new').html("<div> "+ localStorage.user_name + " </div>");*/
        /*alert("bbbb");*/
        $('#login').addClass('hidden');
        $('.login-new').removeClass('hidden');
        $('.start-market').removeClass('hidden');
        /*$('.user-name').prepend(response.user_name);*/
        if (response.profile_pic_link != null){
            $('div.user-img > img').attr('src', response.profile_pic_link);
        }
        else {
            $('div.user-img > img').attr('src', response.user_image_url)
        }
    }
    

    $('#logout, #profile').click(function () {
        if (this.id == 'logout') {
            $.ajax({
                type: "POST",
                url: "http://localhost/trada-backend/index.php/user/logout",
                success : function(result){
                    localStorage.removeItem('result');
                    $('#login').removeClass('hidden');
                    $('.login-new').addClass('hidden');
                    $('.start-market').addClass('hidden');
                    window.location.reload();
                }
            });
            
        }
        else if (this.id == 'profile') {
            alert('MADAFAKA');
        }
    });

    $('#logsubmit').click(function(){ 
        var email = $("#email").val();
        var password = $("#password").val();
        var dataString = "user_name=" + email + "&password=" + password;
        $.ajax({
            type: "POST",
            url: "http://localhost/trada-backend/index.php/user/login",
            data: dataString,
            success : function(result){
                var result1 = JSON.parse(result);
                if($.isEmptyObject(result1)){
                    alert("wrong input");
                }
                else{
                    localStorage.setItem('result',result);
                    window.location.reload();
                }
            }
        });
    });

    $('#sign-up').click(function(event){
        $('#main-content').load('signup.html');
        event.preventDefault();
    });

    $.ajax({
        type: "POST",
        url: "http://localhost/trada-backend/index.php/Facebook_login/fb_login",
        success : function(url_response){
            var url = JSON.parse(url_response);
            /*alert(url.login_url);*/
            $('a.btn-facebook').attr('href', url.login_url);
            /*alert(readCookie('facebook'));*/
            
        }
    });
    var fb_data= document.cookie;
    if(fb_data != null){
        var cookieParts = fb_data.match(/^([^=]+)=(.*)$/);
        var cookie_name = cookieParts[1];
        var decode = decodeURIComponent(cookieParts[2]);
        var fb = JSON.parse(decode);
        /*var new_user_name = fb.user_name.replace('+', ' ');*/
        /*alert(new_user_name);*/
        localStorage.setItem('result', JSON.stringify(fb));
        window.location.reload();
    }
});
