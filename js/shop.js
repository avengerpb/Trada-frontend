$(document).ready(function(){
	var shop_info = JSON.parse(sessionStorage.getItem('shop'));
	$('p.lead').html('<h2>'+shop_info.shop_name+'</h2>');
	/*alert(shop_info.shop_name);*/
})