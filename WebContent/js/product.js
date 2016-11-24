$(function(){

	$.ajax({
		url: './ProductController',
		type: 'post',
		dataType: 'text',
		data: {},
		success:function(data){//data为返回过来的地址
			console.log(data);
			var products = eval("("+data+")");
			$("#pro_id").attr("value",products[0].id);
			$("#pro_preprice").html("<em>￥</em>"+products[0].preprice);
			$("#pro_curprice").html("<em>￥</em>"+products[0].curprice);
			$("#pro_detail").html(products[0].detail);
			$("#pro_price").attr("value",products[0].curprice);
			
		},

		error:function(data){//data为返回过来的地址
			alert("error");
		}
	})

});