$(function(){
	var token = getCookie("token");
	function asx(token){
		$.ajax({
			type:"get",
			url:"http://47.104.244.134:8080/cartlist.do",
			data:{"token":token},
			success:function(data){
				console.log(data);
				for(let i=0;i<data.length;i++){
					//获取token
					token =getCookie("token");
					var img = data[i].goods.picurl;//图片
					var $img = `<img class="oimg" src = ${img}>`;
					var sname = data[i].goods.name;//名字
					var $sname =`<span class="sname">${sname}</span>`;
					var price = data[i].goods.price/100;//价格
					var $price = `<p class="price">${price}</p>`;
					var number = data[i].count;//数量
					var heji =price*number;
					var $heji = `<p class="hej">${heji}元</p>`;
					var $delect = `<input type="button" class="delect" value="删除">`;
					var $number1 =`<input class="number1" type="button" value="-" >`;
					var $cunshu =`<span class="cunshu">${number}</span>`; 
					var $number2 =`<input class="number2" type="button" value="+" >`;
					var $number = `<div class="number">${$number1}${$cunshu}${$number2}</div>`;
					var $tr = `<tr>
									<td>${$img}</td>
									<td>${$sname}</td>
									<td>${$price}</td>
									<td>${$number}</td>
									<td class="heji">${$heji}</td>
									<td>${$delect}</td>
								</tr>`; 
					$("#shang").append($tr);
					
				}
				for(let j=0;j<data.length;j++){
					//删除
					$(".delect").eq(j).on("click",function(){
						var id =data[j].id;//商品编号
						var gid = data[j].gid;//购物车中商品编号
						$.ajax({
								type:"get",
								url:"http://47.104.244.134:8080/cartupdate.do",
								data:{
									"id":id,
									"gid":gid,
									"num":0,
									"token":token
								},
								success:function(a){
									var jied = document.getElementsByClassName("delect")[j];
									var fujied= jied.parentNode.parentNode;
									var ffjied = fujied.parentNode;
									ffjied.removeChild(fujied);
								}
							});
							
					});
					
					
					//增加减少
					$(".number2").eq(j).on("click",function(){
						var id =data[j].id;//商品编号
						var gid = data[j].gid;//购物车中商品编号
						$.ajax({
								type:"get",
								url:"http://47.104.244.134:8080/cartupdate.do",
								data:{
									"id":id,
									"gid":gid,
									"num":1,
									"token":token
								}
							});
						$.ajax({
							type:"get",
							url:"http://47.104.244.134:8080/cartlist.do",
							data:{"token":token},
							success:function(data){
								var id =data[j].id;//商品编号
								var gid = data[j].gid;//购物车中商品编号
								var numbe = data[j].count;//数量
								var heji = numbe*data[j].goods.price/100+"元";//合计
								$(".cunshu").eq(j).html(numbe);
								$(".heji").eq(j).html(heji);
							},
							});
							
					});
					$(".number1").eq(j).on("click",function(){
						var id =data[j].id;//商品编号
						var gid = data[j].gid;//购物车中商品编号
						var number = data[j].count;//数量
						$.ajax({
								type:"get",
								url:"http://47.104.244.134:8080/cartupdate.do",
								data:{
									"id":id,
									"gid":gid,
									"num":-1,
									"token":token
								},
								success:function(data){
									
								}
							}
						);
							$.ajax({
							type:"get",
							url:"http://47.104.244.134:8080/cartlist.do",
							data:{"token":token},
							success:function(data){
								var id =data[j].id;//商品编号
								var gid = data[j].gid;//购物车中商品编号
								var numbe = data[j].count;//数量
								var heji = numbe*data[j].goods.price/100+"元";//合计
								$(".cunshu").eq(j).html(numbe);
								$(".heji").eq(j).html(heji);
							},
						});
					});
				}
			}
		});
	}
	asx(token);
});