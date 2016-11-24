$(function(){
	var user_id=$.cookie("id");
	$.ajax({
		url: './AccountGetController',
		type: 'post',
		dataType: 'text',
		data: {
			user_id:user_id,
			action:"1"
		},
		success:function(data){//data为返回过来的地址
			console.log(data);
			var accounts = eval("("+data+")");
			if(accounts.length>0){
				for(var i=accounts.length-1;i>=0;i--){
					$("#cart_inner").append(
					"<div class='cart_cont clearfix'>"+
                    "<div class='cart_item t_name'>"+
                        "<div class='cart_shopInfo clearfix'>"+
                            "<img src='images/detail/m4.jpg' alt=''>"+
                            "<div class='cart_shopInfo_cont'>"+
                                "<p class='cart_link'><a href='#' id='account_detail'>"+accounts[i].detail+"</a></p>"+
                                "<p class='cart_info'>此商品为鲜活易腐类，不支持7天无理由退货</p>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                    "<div class='cart_item t_price' id='account_price'>"+accounts[i].price+"</div>"+
                    "<div class='cart_item t_return'>0.00</div>"+
                    "<div class='cart_item t_num' id='t_num'>"+accounts[i].number+"</div>"+
                    "<div class='cart_item t_subtotal t_red' id='t_subtotal'>"+accounts[i].price * accounts[i].number+"</div>"+
                "</div>"
				)
				}
				
//				$("#account_detail").html(accounts[accounts.length-1].detail);
//				$("#account_price").html(accounts[accounts.length-1].price);
//				$("#t_num").html(accounts[accounts.length-1].number);
//				$("#t_subtotal").html(accounts[accounts.length-1].number * accounts[accounts.length-1].price + ".00");
			}
		},

		error:function(data){//data为返回过来的地址
			alert("error");
		}
	})

});