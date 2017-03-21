$(document).ready(function(){
	$('.no-result').hide();
	$('.show-user').hide();
	$('.show-shop').hide();
	var ul = $('.show-item ul');
	var ul2 = $('.show-user ul');
	var ul3 = $('.show-shop ul');
	
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
		$('.search-user').show();
		$('.search-shop').show();
		$('.see-more').hide();
		$('.category').hide();
		$('#slides').hide();
		ul.hide();
		ul2.hide();
		ul3.hide();
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
	            	$('.search-user').hide();
	            	$('.search-item').hide();
	            	$('.search-shop').hide();
	            	$('.show-item').hide();

	            }
	            else{
	            	$('.show-item').show();
	            	$('.show-user').show();
	            	$('.show-shop').show();
	            	$('.no-result').hide();
					var text = '';
					ul.show();
					ul2.show();
					ul3.show();
					/*ul2.show();*/
					var num_result = result.item.length + result.user.length + result.shop.length;
					$('h2.search-result').html(num_result + ' result(s) found');
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

					for (var i=0 ; i < result.user.length; i++) { 
					
					   ul2.find('li:first').clone()
					           .attr({'id': 'user'+i})
					           .appendTo(ul2);
					   $('#user'+i).show();
					   $('#user'+i+'> a.user-avatar > img').attr('src', result.user[i].user_image_url);
					   $('#user'+i+' > p.search-name').html(result.user[i].user_name);
					   $('#user'+i+' > p.search-email > span').html(result.user[i].email);
					   /*$('#user'+i+' > p.search-location > span').html(result.user[i].location);*/
					}
					ul2.find('li:first').hide();
					for(var i = result.user.length; i<10000; i++){
						$('#user'+i).hide();
					}

					for (var i=0 ; i < result.shop.length; i++) { 
					
					   ul3.find('li:first').clone()
					           .attr({'id': 'shop'+i})
					           .appendTo(ul3);
					   $('#shop'+i).show();
					   $('#shop'+i+'> a.shop-avatar-index > img').attr('src', result.shop[i].shop_image_url);
					   $('#shop'+i+' > p.shop-name-index').html(result.shop[i].shop_name);
					   $('#shop'+i+' > p.shop-addr-index > span').html(result.shop[i].address);
					   /*$('#user'+i+' > p.search-location > span').html(result.user[i].location);*/
					}
					ul3.find('li:first').hide();
					for(var i = result.shop.length; i<10000; i++){
						$('#shop'+i).hide();
					}

	           	} 
	        }
	    });
	});
});
