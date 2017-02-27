$(document).ready(function(){
	$('input#srch-term').keypress(function(e) {
	    if (e.which == '13') {
	    /*var input = $('#srch-term').val();*/
	        e.preventDefault();
	         /*alert(input);*/
	        $('#srch-btn').trigger('click');
	    }
	});
	$('#srch-btn').click(function(){
	    var search_phrase = $('#srch-term').val();
	    var searchString = "search_phrase=" + search_phrase;
	    /*alert(search);*/
	    $.ajax({
	        type: "POST",
	        url: "http://localhost/trada-backend/index.php/search/search_result",
	        data: searchString,
	        success : function(result){
	            var result = JSON.parse(result);
	            if(result.length == 0){
	            	alert('please input something');
	            }
	            else{
	            	alert(result.item[0].item_name); 
	           	} 
	        }
	    });
	});
});