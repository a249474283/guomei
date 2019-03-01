



$(function(){
	//获取商品ID
	var aa= window.location.search;
	var c =aa.indexOf("=");
	var d =aa.substring(c+1);
	console.log(d);
	//获取商品信息
	$.ajax({
		url:" http://47.104.244.134:8080/goodsbyid.do",
		type:"get",
		data:{"id":d},
		success:function(data){
			console.log(data);
			//放大镜
			var $img = `<img src=${data.picurl}>`;//商品图片
			$(".probox").append($img);
			$(".showbox").append($img);
			function Zoom(imgbox,hoverbox,l,t,x,y,h_w,h_h,showbox){
					var moveX =x-l-(h_w/2);
					//鼠标区域距离
					var moveY =y-t-(h_h/2);
					//鼠标区域距离
					if(moveX<0){moveX=0}
					if(moveY<0){moveY=0}
					if(moveX>imgbox.width()-h_w){moveX=imgbox.width()-h_w}
					if(moveY>imgbox.height()-h_h){moveY=imgbox.height()-h_h}
					//判断鼠标使其不跑出图片框
					var zoomX =showbox.width()/imgbox.width()
					//求图片比例
					var zoomY =showbox.height()/imgbox.height()
					
					showbox.css({left:-(moveX*zoomX),top:-(moveY*zoomY)})
					hoverbox.css({left:moveX,top:moveY})
					//确定位置
				
				}
			function Zoomhover(imgbox,hoverbox,showbox){
					var l = imgbox.offset().left;
					var t = imgbox.offset().top;
					var w =hoverbox.width();
					var h = hoverbox.height();
					var time;
					$(".probox img,.hoverbox").mouseover(function(e){
						var x=e.pageX;
						var y=e.pageY;
						$(".hoverbox,.showbox").show();
						hoverbox.css("opacity","0.3")
						time =setTimeout(function(){Zoom(imgbox,hoverbox,l,t,x,y,w,h,showbox)},1)			
					}).mousemove(function(e){
						var x=e.pageX;
						var y=e.pageY;	
						time =setTimeout(function(){Zoom(imgbox,hoverbox,l,t,x,y,w,h,showbox)},1)
					}).mouseout(function(){
						showbox.parent().hide()
						hoverbox.hide();
					})
				}	
			Zoomhover($(".probox img"),$(".hoverbox"),$(".showbox img"));
			
			//详情页右侧
			var name =data.name;
			var jianjie = data.info;
			var jiage = data.price/100;
			var pingfen = data.star;
			var $pName =`<p class="name">${name}</p>`;
			var $pJianjie = `<p class="jianjie">${jianjie}</p>`;
			var $pJiage =  `<p class="jiage">￥${jiage}</p>`;
			var $pPingfen = `<p class="pingfen">评分:${pingfen}</p>`;
			var $submit = `<input class="submit" type="button" value="加入购物车"/>`;

			
			$(".details .neirong ._right").append($pName);
			$(".details .neirong ._right").append($pJianjie);
			$(".details .neirong ._right").append($pJiage);
			$(".details .neirong ._right").append($pPingfen);

			$(".details .neirong ._right").append($submit);

			

			var token = getCookie("token");
			console.log(token);
			$(".submit").on("click",function(){
				$.ajax({
					type:"get",
					url:"http://47.104.244.134:8080/cartsave.do",
					data:{
						"gid":d,
						"token":token
					},
					success:function(data){
						if(data.code==0){
							alert("添加成功");
							window.location.href="http://localhost/guomei/html/shoop.html";
						}
					}
					
				});
			});

		}
	});
	
	
	
	
	
	
	
		
});