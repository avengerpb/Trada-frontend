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
            }
        });
    }
    // else {
    //     window.location.replace("http://localhost/trada-frontend/index.html");
    // }
});
