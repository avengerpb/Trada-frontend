$(document).ready(function(){
    $('#signup').click(function(){ 
        var user_name = $("#new-username").val();
        var full_name = $("#new-fullname").val();
        var email = $("#new-email").val();
        var password = $("#new-password").val();
        var cpassword = $("#new-cpassword").val();
        var dataString = "user_name=" + user_name + "&full_name=" + full_name + "&email=" + email +  "&password=" + password + "&cpassword=" + cpassword;
        $.ajax({
            type: "POST",
            url: "http://localhost/trada-backend/index.php/user/signup",
            data: dataString,
            success : function(result){
            // alert("dataString");
                window.location.replace("http://localhost/trada-frontend/index.html");
                var result = JSON.parse(result);
                if(result != null){
                }
                
            }
        });
        alert("please wait a second");
        });
});
