$(function(){
	$("#shopCar_detail").html($.cookie("detail"));
	$("#shopCar_price").html($.cookie("pro_curprice"));
	$("#t_num").html($.cookie("number"));
	$("#t_subtotal").html($.cookie("pro_curprice") * $.cookie("number") + ".00");
	$("#totalPrice").html($.cookie("pro_curprice") * $.cookie("number") + ".00");
});