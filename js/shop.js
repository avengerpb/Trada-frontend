$(document).ready(function(){
	var shop_info = JSON.parse(sessionStorage.getItem('shop'));
	var shop_item_info = JSON.parse(sessionStorage.getItem('shop_item'));
	for(var i=0;i<shop_item_info.length;i++){
		alert(shop_item_info[i].item_name);
	}
	$('p.lead').html('<h2>'+shop_info.shop_name+'</h2>');
	/*alert(shop_info.shop_name);*/
})