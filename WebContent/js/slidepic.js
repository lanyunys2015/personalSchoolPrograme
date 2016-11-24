window.onload=function () {
	
	var container=document.getElementById("container");
    var list=document.getElementById("list");
    var buttons=document.getElementById("buttons").getElementsByTagName("span");
    var prev=document.getElementById("prev");
    var next=document.getElementById("next");
    var index=1;           //用于控制按钮
    var animated = false;

    //鼠标点击事件->下一张
    next.onclick=function(){
        
        if(!animated){
            if (index==3) {index=0};
            index+=1;
            animate(-800);
            showButton();
        }      
        
    }
    

    //鼠标点击事件->前一张
    prev.onclick=function(){
        
        if(!animated){
            if (index==1) {index=4}
            index -=1;
            animate(800);
            showButton();
        }       
        
    }

    
    //通过点击按钮操作图片
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick=function(){
            var myindex=this.getAttribute("index");
            offset= -800 * (myindex - index);
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
                if (newLeft>-800) {list.style.left= -2400 +'px';}
                //在最后一张 图片上按上一张的按钮则把图片定位到第一张 
                if (newLeft<-2400) {list.style.left= -800 +'px';}
            }
        }    
            go();//运行移动函数
    }    
    	

    //自动播放函数
    function play(){
        timer= setInterval(function (){
            next.onclick();
        },3000)
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

