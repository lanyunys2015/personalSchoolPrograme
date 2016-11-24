/**
 * Created by ys on 2016/3/9.
 */
window.onload=function () {

	getCookies();
  //图片滑动页面
  slide();
  //商品详细信息页面
  productDetail();
  //购物车页面
  shoppingCar();
  //图片展
//  hexin1();

  function getCookies(){
		var username = $.cookie("name");
    	var id = $.cookie("id");
    	if(username==undefined||id==undefined){
    		return false;
    	}else{
    		$("#index_login").html("["+username+"]").attr("href","");
    		$("#index_register").html("["+id+"]").attr("href","").css("display","none");
    		$("#rightArea").append("<a id='index_loginout' href='login.html'>[退出]</a>");    	   			
    		
    	}
  }
	  $("index_loginout").click(function(){
		  $.cookie('name',null);
	  })

  function slide(){
    var container=document.getElementById("container");
    if( !container ){ return false; }
    var list=document.getElementById("list");
    if( !list ){ return false; }
    var buttons=document.getElementById("buttons").getElementsByTagName("span");
    if( !buttons ){ return false; }
    var prev=document.getElementById("prev");
    if( !prev ){ return false; }
    var next=document.getElementById("next");
    if( !next ){ return false;}
    var index=1;           //用于控制按钮
    var animated = false;

    //鼠标点击事件->下一张
    next.onclick=function(){

      if(!animated){
        if (index==3) {index=0};
        index+=1;
        animate(-603);
        showButton();
      }

    }
    //鼠标点击事件->前一张
    prev.onclick=function(){

      if(!animated){
        if (index==1) {index=4}
        index -=1;
        animate(603);
        showButton();
      }

    }
    //通过点击按钮操作图片
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick=function(){
        var myindex=this.getAttribute("index");
        offset= -603 * (myindex - index);
        animate(offset);
        index=myindex;
        showButton();
      }
    }
    //控制按钮的背景
    function showButton(){
      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].className=="on")
        {buttons[i].className="";};             //清除所有点亮的背景
      };
      buttons[index - 1].className="on";
    }
    //
    function animate(offset){
      var newLeft=parseInt(list.style.left)+offset;    //获取目标位置的坐标newLeft
      var time=300;                                   //位移总时间
      var interval=10;                                //位移间隔时间
      var speed=offset/(time/interval);                //每次位移量

      //图片移动函数
      function go(){
        //判断是否满足移动条件
        if (speed<0 && parseInt(list.style.left)>newLeft || (speed>0 && parseInt(list.style.left)<newLeft)) {
          animated = true;
          //条件成立，让图片安speed移动
          list.style.left = parseInt(list.style.left) + speed +'px';
          //循环调用移动函数
          setTimeout(go,interval);
        }else{
          animated = false;
          //条件不成立说明达到了目标位置或超出目标位置
          list.style.left=newLeft+"px";
          //在第一张图片上按上一张的按钮则把图片定位到最后一张
          if (newLeft>-603) {list.style.left= -1809 +'px';}
          //在最后一张 图片上按上一张的按钮则把图片定位到第一张
          if (newLeft<-1809) {list.style.left= -603 +'px';}
        }
      }
      go();//运行移动函数
    }
    //自动播放函数
    function play(){
      timer= setInterval(function (){
        next.onclick();
      },2000)
    }
    //停止自动播放函数
    function stop(){
      clearInterval(timer);
    }
    //停止与自动播放函数的触发事件
    container.onmouseover= stop;
    container.onmouseout= play;
    //页面加载完成后让图片自动播放
    play();
  }
  function productDetail(){
    //图片选择
    photoChiose();
    //增减商品与加入购物车
    shoppingPlus();
  }
  function photoChiose(){
    var biggerPhoto = document.getElementById("jqzoom");
    if(!biggerPhoto){return false;}
    var orange = document.getElementById("orange-photo");
    if(!orange){return false;}
    var photos = orange.getElementsByTagName("img");
    if(!photos){return false;}
    var bigPhoto = document.getElementById("big-photo");
    if(!bigPhoto){return false;}
    var photoArr = ['images/detail/m3.jpg','images/detail/p2.jpg','images/detail/n2.jpg','images/detail/q2.jpg','images/detail/o2.jpg'];
    var biggerPhotos = ['images/detail/m1.jpg','images/detail/p1.jpg','images/detail/n2.jpg','images/detail/q1.jpg','images/detail/o1.jpg'];
    for( var i=0; i<photos.length; i++){
      photos[i].num = i;
      photos[i].onclick = function(){
        for(var j=0; j<photos.length; j++){
          if( photos[j].className == "active"){
            photos[j].className = "";
          }
        }
        this.className = "active";
        biggerPhoto.href = biggerPhotos[this.num];
        bigPhoto.src = photoArr[this.num];
      }
    }
    $("#jqzoom").jqzoom({
      zoomWidth: 300, //小图片所选区域的宽
      zoomHeight: 300, //小图片所选区域的高
      zoomType: 'reverse' //设置放大镜的类型
    });
  }
  function shoppingPlus(){

    //减号的获取
    var reduction = document.getElementById("reduction");
    if(!reduction){return false;}
    //加号
    var plus = document.getElementById("plus");
    if(!plus){return false;}
    //输入框
    var textVal = document.getElementById("textVal");
    if(!textVal){return false;}

    reduction.onclick = function(){
      if( textVal.value <= 1){
        textVal.value = 0;
      }else{
        textVal.value --;
      }
    };
    plus.onclick = function(){
      if( textVal.value >= 9){
        textVal.value = 9;
      }else{
        textVal.value ++;
      }
    };
  }
  function shoppingCar(){

    var totalNum = document.getElementById("t_num");
    if( !totalNum){ return false;}
    var subTotal = document.getElementById("t_subtotal");
    if( !subTotal){ return false;}
    var totalPrice = document.getElementById("totalPrice");
    if( !totalPrice){ return false;}
    var textValue = document.getElementById("textVal");
    if( !textValue){ return false;}

  }
  
  $(function(){
	  $("#register_btn").click(function(){
			var username = $("#username").val();
			var pwd = $("#pwd").val();
			var pwd2 = $("#pwd2").val();
			var email = $("#email").val();
			if(username==""){
				alert("请填写用户名！");
			}else if(pwd == ""){
				alert("请输入密码！");
			}else if(pwd2 != pwd){
				alert("请输入相同的密码！");
			}else if(email== ""){
				alert("请输入email！");
			}else{
				$.ajax({
			        url: './RegisterController',
			        type: 'post',
			        dataType: 'text',
			        data: 
			        {
			        	"name": username,
			        	"email":email,
			        	"password":pwd
			        },
			        success:function(data){//data为返回过来的地址
			        	alert("恭喜您注册成功！");
			        	window.location.href = "./login.html";
			        },
			        
			        error:function(data){//data为返回过来的地址
				           alert("error");
				    }
			    })
			} 
		})
		//立即购买按钮
		 $("#shopbuy").click(function(){
			 $.cookie("pro_id", $("#pro_id").attr("value"));
			 $.cookie("pro_curprice", $("#pro_price").attr("value"));
			 $.cookie("detail", $("#pro_detail").html());
			 $.cookie("number", $("#textVal").val());
			 window.location.href="./shopCar.html";
			 
		 });
	  	
	  	//提交订单按钮
	  	$("#cart_btn").click(function(){
			 var product_id = $.cookie("pro_id");
			 var price =  $.cookie("pro_curprice");
			// var detail = $.cookie("detail");
			 var number = $.cookie("number");
			 var user_id = $.cookie("id");
			 var address = $("#shopCar_address").val();
			 var phone = $("#shopCar_phone").val();
			 var reciver = $("#shopCar_reciver").val();
			 var is_shopping = "1";

			 if( address == ""){
				 alert("请输入收货地址！")
			 }else if( reciver == ""){
				 alert("请输入收货人姓名！")
			 }else if( phone == ""){
				 alert("请输入联系方式！");
			 }else{
				 $.ajax({
				        url: './AccountController',
				        type: 'post',
				        dataType: 'text',
				        data: 
				        {
				        	"product_id":product_id,
				        	"price":price,
				        	"number":number,
				        	"user_id":user_id,
				        	"address":address,
				        	"phone":phone,
				        	"reciver":reciver,
				        	"is_shopping":is_shopping
				        },
				        success:function(data){//data为返回过来的地址
				        		alert("订单提交成功！");
				        		window.location.href = "./account.html";			        	
				        	
				        },
				        
				        error:function(data){//data为返回过来的地址
					           alert("订单填写失败！");
					    }
				    })
			 }
			 
			 
		 });
	  
	  //登录按钮
		 $("#login_on").click(function(){
				var username = $("#login_name").val();
				var pwd = $("#login_pwd").val();
				if(username==""){
					alert("username is null");
				}else{
					$.ajax({
				        url: './LoginController',
				        type: 'post',
				        dataType: 'text',
				        data: 
				        {
				        	"email":username,
				        	"password":pwd
				        },
				        success:function(data){//data为返回过来的地址
				        	if(data=="用户或密码错误！"){
				        		alert(data);
				        	}else{
				        		var user = eval("("+data+")");
				        		$.cookie("name", user.name);
					        	$.cookie("id", user.id);
					        	window.location.href="./index.html";
				        	}
				        	
				        },
				        
				        error:function(data){//data为返回过来的地址
					           alert("error");
					    }
				    })
				} 
			})

  });
};

