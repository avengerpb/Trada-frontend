function showShop(shop_id) { 
    string = 'shop_id='+shop_id;
    $.ajax({
        type: "POST",
        data: string,
        url: "http://localhost/trada-backend/index.php/shop/fetch_data_from_db",
        success : function(result){
            var result = JSON.parse(result);
            /*alert(result.shop_name);*/
            sessionStorage.setItem('shop', JSON.stringify(result));
            
            // window.location.href = 'http://localhost/trada-frontend/shop.html';
        }
    });

    $.ajax({
        type: "POST",
        data: string,
        url: "http://localhost/trada-backend/index.php/shop/get_all_item_from_shop",
        success : function(result_item){
            var result_item = JSON.parse(result_item);
            /*alert(result.shop_name);*/
            sessionStorage.setItem('shop_item', JSON.stringify(result_item));
            
            window.location.href = 'http://localhost/trada-frontend/shop.html';
        }
    });
};
$(document).ready(function(){
// alert("hello");
    var response = JSON.parse(localStorage.getItem('result'));
    if (response != null){
        var user_name = response.user_name;
        $.ajax({
            type: "POST",
            url: "http://localhost/trada-backend/index.php/user/profile/"+user_name,
            success : function(response){
                var response = JSON.parse(response);
                $('#profile-title ').prepend(response.full_name);
                $('#fb-full-name > span').prepend(response.full_name);
                $('#fb-dob > span').prepend(response.dob);
                $('#fb-location > span').prepend(response.location);
                $('#fb-email > span').prepend(response.email);
                $('#fb-link > a').attr('href', response.fb_link);
                $('#fb-link > a').append(response.fb_link);
                $('.fb-pic > img').attr('src', response.user_image_url);
                /*localStorage.setItem('user_id',response.user_id);*/
            }
        });

        /*var user_id = localStorage.getItem('user_id');*/
        var user_id = response.user_id
        /*alert(typeof user_id);*/
        var dataString = 'user_id=' + user_id;
        /*localStorage.removeItem('user_id');*/
        var ul_shop = $('.shop-list-toggle ul');
        /*ul_shop.hide();*/
        
        $.ajax({
            type: "POST",
            data: dataString,
            url: "http://localhost/trada-backend/index.php/user/get_all_shop_from_user",
            success : function(response){
                var response = JSON.parse(response);
                /*alert(response.length); */ 
                $('#number-shop > span').html(response.length);
                $('a.shop-list').click(function(){
                    /*$(".shop-list-toggle").slideToggle("slow");*/
                    /*ul_shop.show();*/

                    if(response.length !== 0){
                        for(var i=0;i<response.length;i++){
                            ul_shop.find('li:first').clone()
                                    .attr({'id': 'shop'+i})
                                    .appendTo(ul_shop);
                            $('#shop'+i+' > p.shop-name').html(response[i].shop_name);
                            $('#shop'+i+' > p.shop-addr > span').html(response[i].address);
                            $('#shop'+i+'> a.shop-avatar > img').attr('src', response[i].shop_image_url);
                            $('#shop'+i+'> a.shop-avatar').attr('onclick', 'showShop('+response[i].shop_id+')');
                        }
                        ul_shop.find('li:first').hide();
                        $(".shop-list-toggle").slideToggle("slow");
                    }
                   /* else {
                        $("a.shop-list").hide();
                    }*/
                }); 
            }
        });
    }
        
    $('#market-register').click(function(){
        /*alert('dddd');*/
        var market_name = $('#market-name').val();
        var market_addr = $('#market-addr').val();
        var facebook_link = $('#facebook-link').val();
        var fb_link = 'fb_link='+facebook_link; 
        dataString = 'shop_name='+market_name+'&address='+market_addr+'&fb_link='+facebook_link;
        alert(dataString);
        $.ajax({
            type: "POST",
            data: dataString,
            url: "http://localhost/trada-backend/index.php/shop/create",
            success : function(response){
                var response = JSON.parse(response);
                /*alert(response.status);*/   
            }
        });

        $.ajax({
            type: "POST",
            data: dataString,
            url: "http://localhost/trada-backend/index.php/facebook_login/add_page_shop",
            success : function(response){
                var response = JSON.parse(response);
                /*alert(response.picture);*/   
            }
        });

    });
});
