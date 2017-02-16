
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
                
                alert(result);
            }
        });
    });
});