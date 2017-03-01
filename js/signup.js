$(document).ready(function(){
    $('#wait').hide();
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
            beforeSend: function() { $('#wait').show(); $('#signup').hide(); },
            success : function(result){
            // alert("dataString");
                /*window.location.replace("http://localhost/trada-frontend/index.html");*/
                $('#wait').hide(); 
                $('#signup').show();
                var result = JSON.parse(result);
                /*alert(result.status + result.user_name + result.email);*/
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
                     window.setTimeout(function() {
                         window.location.replace("http://localhost/trada-frontend/index.html");
                     }, 6000);;
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
                    } 
                }
            }
        });
    });
});
