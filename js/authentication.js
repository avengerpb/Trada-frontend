
$(document).ready(function(){
    $("#logsubmit").click(function(){
        var email = $("#email").val();
        var password = $("#password").val();
        var dataString = "user_name=" + email + "&password=" + password;
        // alert("abc");

        $.ajax({
            type: "POST",
            url: "http://localhost/trada-backend/index.php/user/login",
            data: dataString,
            success : function(result){
                var response = $.parseJSON(result);
                /*alert (response.email);*/
                if (response.is_logged_in == 1) {
                    $('#login').replaceWith("<span> Welcome "+ response.user_name + " </span>");
                }
            }
        });
    });
});