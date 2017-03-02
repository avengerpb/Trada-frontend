$(document).ready(function(){
	var shop_info = JSON.parse(sessionStorage.getItem('shop'));
	var shop_item_info = JSON.parse(sessionStorage.getItem('shop_item'));
	for(var i=0;i<shop_item_info.length;i++){
		// alert(shop_item_info[i].item_name);
		$('.product-list-basic > li >h2').html(shop_item_info[i].item_name);
		$('p.product-price').html(shop_item_info[i].price);
	}
	$('p.lead').html(shop_info.shop_name);
	$('.shopname > img').attr('src', shop_info.shop_image_url);
	$('.shopname > p > a').attr('href', shop_info.fb_link);
	/*alert(shop_info.shop_name);*/
})