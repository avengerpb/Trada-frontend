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
                // $('#fb-full-name > span').prepend(response.full_name);
                $('#fb-full-name').attr('value',response.full_name);
                $('#fb-dob').attr('value',response.dob);
                $('#fb-location').attr('value',response.location);
                // alert("hello");
                $('#fb-email').attr('value',response.email);
                $('#fb-link ').attr('value', response.fb_link);
                $('#fb-edit-title > h3').html(response.full_name);
                // $('.fb-pic > img').attr('src', response.user_image_url);
            }
        });

        $('#submitedit').click(function(){ 
            var full_name = $("#fb-full-name").val();
            var dob = $("#fb-dob").val();
            var location = $("#fb-location").val();
            var email = $("#fb-email").val();
            var link = $("#fb-link").val();
            var dataString = "full_name=" + full_name + "&dob=" + dob + "&email=" + email +  "&location=" + location + "&link=" + link + "&user_name=" + response.user_name;
            /*alert(dataString);*/
            $.ajax({
                type: "POST",
                url: "http://localhost/trada-backend/index.php/user/edit_profile_form",
                data: dataString,
                success : function(result){
                    var result = JSON.parse(result);
                    if(result != null){
                        $('#profile-title ').prepend(result.full_name);
                        // $('#fb-full-name > span').prepend(result.full_name);
                        $('#fb-full-name').attr('value',result.full_name);
                        $('#fb-dob').attr('value',result.dob);
                        $('#fb-location').attr('value',result.location);
                        $('#fb-edit-title > h3').html(result.full_name);
                        $('#fb-email').attr('value',result.email);
                        $('#fb-link ').attr('value', result.fb_link);
                        var info = "UPDATE SUCCESSFUL";
                        $("#result").html('<div class="alert alert-success"><button type="button" class="close">×</button>'+info+'</div>');

                         //timing the alert box to close after 5 seconds
                         window.setTimeout(function () {
                             $(".alert").fadeTo(500, 0).slideUp(500, function () {
                                 $(this).remove();
                             });
                         }, 5000);

                         //Adding a click event to the 'x' button to close immediately
                         $('.alert .close').on("click", function (e) {
                             $(this).parent().fadeTo(500, 0).slideUp(500);
                         });
                    }
                    
                }
            });
        });
    }
    // else {
    //     window.location.replace("http://localhost/trada-frontend/index.html");
    // } 
});
