$(document).ready(function(){
	$('.no-result').hide();
	var ul = $('.show-item ul');
	
	$('input#srch-term').keypress(function(e) {
	    if (e.which == '13') {
	    /*var input = $('#srch-term').val();*/
	        e.preventDefault();
	         /*alert(input);*/
	        $('#srch-btn').trigger('click');
	    }
	});
	$('#srch-btn').click(function(){
		$('.search-result').show();
		$('.search-item').show();
		$('.see-more').hide();
		$('.category').hide();
		$('#slides').hide();
		ul.hide();
	    var search_phrase = $('#srch-term').val();
	    var searchString = "search_phrase=" + search_phrase;
	    
	    /*alert(search);*/
	    $.ajax({
	        type: "POST",
	        url: "http://localhost/trada-backend/index.php/search/search_result",
	        data: searchString,
	        success : function(result){
	            var result = JSON.parse(result);
	            if(result.length == 0 || (result.item.length == 0 && result.user.length == 0 && result.shop.length == 0)){
	            	$('.no-result').show();
	            	$('#slides').hide();
	            	$('.search-result').hide();
	            	$('.search-item').hide();
	            	$('.show-item').hide();
	            }
	            else{
	            	$('.show-item').show();
	            	$('.no-result').hide();
					var text = '';
					ul.show();
					for (var i=0 ; i < result.item.length; i++) { 
					
					   ul.find('li:first').clone()
					           .attr({'id': 'item'+i})
					           .appendTo(ul);
					   $('#item'+i).show();
					   $('#item'+i+' > h2 > a').html(result.item[i].item_name);
					   $('#item'+i+' > p.product-price').html(result.item[i].price);
					}
					ul.find('li:first').hide();
					for(var i = result.item.length; i<10000; i++){
						$('#item'+i).hide();
					}
	           	} 
	        }
	    });
	});
});
