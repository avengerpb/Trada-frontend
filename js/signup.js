$(document).ready(function(){
    $('#signup').click(function(){
        var user_name = $("#new-username").val();
        var email = $("#new-email").val();
        var password = $("#new-password").val();
        var cpassword = $("#new-cpassword").val();
        var dataString = "user_name=" + user_name + "&email=" + email +  "&password=" + password + "&cpassword=" + cpassword;
        $.ajax({
            type: "POST",
            url: "http://localhost/trada-backend/index.php/user/signup",
            data: dataString,
            success : function(result){
            // alert("dataString");
                /*window.location.replace("http://localhost/trada-frontend/index.html");*/
                var result = JSON.parse(result);
                if(result.status == 'ok') {
                    var info = "Success! Please check your email for confirmation!";
                    $("#success").html('<div class="alert alert-success"><button type="button" class="close">×</button>'+info+'</div>');

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
                else {
                    if(result.status == 'empty'){
                        var info = "All fields are required!";
                        $("#empty").html('<div class="alert alert-danger">'+info+'</div>');

                         //timing the alert box to close after 5 seconds
                         window.setTimeout(function () {
                             $(".alert").fadeTo(500, 0).slideUp(500, function () {
                                 $(this).remove();
                             });
                        }, 5000);
                    } else {
                        $('#empty').hide();
                    }
                    if(result.user_name == 'inuse'){
                        var info = "User name is inused";
                        $("#username_error").html('<div class="alert alert-danger">'+info+'</div>');

                         //timing the alert box to close after 5 seconds
                         window.setTimeout(function () {
                             $(".alert").fadeTo(500, 0).slideUp(500, function () {
                                 $(this).remove();
                             });
                        }, 5000);
                    } else{
                        $("#username_error").hide();
                    }
                    if(result.email == 'notvalid' || result.email == 'inuse'){
                        var info = "Email is invalid or inused";
                        $("#email_error").html('<div class="alert alert-danger">'+info+'</div>');

                         //timing the alert box to close after 5 seconds
                         window.setTimeout(function () {
                             $(".alert").fadeTo(500, 0).slideUp(500, function () {
                                 $(this).remove();
                             });
                        }, 5000);
                    } else {
                        $("#email_error").hide();
                    }
                    if(result.password == 'mismatch'){
                        var info = "Password does not match";
                        $("#password_error").html('<div class="alert alert-danger">'+info+'</div>');

                         //timing the alert box to close after 5 seconds
                         window.setTimeout(function () {
                             $(".alert").fadeTo(500, 0).slideUp(500, function () {
                                 $(this).remove();
                             });
                        }, 5000);
                    } else {
                        $("#password_error").hide();
                    }
                }
            }
        });
    });
});
