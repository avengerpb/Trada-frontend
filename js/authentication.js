$(document).ready(function(){
    $('.search-result').hide();
    $('.search-item').hide();
    $('.search-user').hide();
    $('.search-shop').hide();
    $.ajax({
        type: "GET",
        url: "http://localhost/trada-backend/index.php/store_items/manage",
        success : function(item){
            var item = JSON.parse(item);
            var text = '';
            var ul = $('.show-item ul');
            for (var i=0 ; i < item.length; i++) { 
                /*text += item[i].item_name;*/
                ul.find('li:first').clone()
                        .attr({'id': 'item'+i})
                        .appendTo(ul);
                $('#item'+i+' > h2 > a').html(item[i].item_name);
                $('#item'+i+' > p.product-price').html(item[i].price);
            }
            ul.find('li:first').hide();
        }

    });

    $('.start-market').click(function(){
        window.location.href ='http://localhost/trada-frontend/newshop.html';
    });

    var response = JSON.parse(localStorage.getItem('result'));
    /*alert(response.user[0].user_id);*/
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
            $('div.user-img > img').attr('src', response.user_image_url);
        }
    }
    

    $('#logout').click(function () {
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
    });

    $('input#password, input#email').keypress(function(e) {
        if (e.which == '13') {
        /*var input = $('#srch-term').val();*/
            e.preventDefault();
             /*alert(input);*/
            $('#logsubmit').trigger('click');
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

    $.ajax({
        type: "GET",
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
        var decode = decodeURIComponent(cookieParts[2]);
        var fb = JSON.parse(decode);
        localStorage.setItem('result', JSON.stringify(fb));
        window.location.reload();
    }  
});
