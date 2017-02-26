$(document).ready(function(){
	$.ajax({
	    type: "POST",
	    url: "http://localhost/trada-backend/index.php/store_items/manage",
	    success : function(item){
	        var item = JSON.parse(item);
	        var i = 0;
	        var text = '';
	        var ul = $('.show-item ul');
	        for (i ; i < item.length; i++) { 
	            /*text += item[i].item_name;*/
	            ul.find('li:first').clone()
	            		.attr({'id': 'item'+i})
	            		.appendTo(ul);
	           	$('#item'+i+' > h2 > a').prepend(item[i].item_name);
	           	$('#item'+i+' > p.product-price').append(item[i].price);
	        }
	        ul.find('li:first').hide();
	    }

	});

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
	            	alert(result.user[0].user_name); 
	           	} 
	        }
	    });
	});
});