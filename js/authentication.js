$(document).ready(function(){
    /*localStorage.removeItem('result');*/
    /*localStorage.clear();*/
    var response = JSON.parse(localStorage.getItem('result'));
    if (response != null) {
        /*$('div#login').attr('id','login-new');
        $('#login-new').html("<div> "+ localStorage.user_name + " </div>");*/
        /*alert("bbbb");*/
        $('#login').addClass('hidden');
        $('.login-new').removeClass('hidden');
        $('.start-market').removeClass('hidden');
        $('.user-name').prepend(response.user_name);
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

    $("#logsubmit").click(function(){
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
                    alert("input ngu vai loz");
                }
                else{
                    localStorage.setItem('result',result);
                    window.location.reload();
                }
            }
        });
    });
});

$(document).ready(function(){
    $('#sign-up').click(function(event){
        $('#main-content').load('signup.html');
        event.preventDefault();
    })
})

$(document).ready(function(){
    $('#log-out').click(function(){

    })
})