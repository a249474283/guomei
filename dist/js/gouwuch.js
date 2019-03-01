$(function(){
	let tokens =getCookie("token");
	let number = 0;
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/cartlist.do",
		data:{"token":tokens},
		success:function(data){
			console.log(data[1].count);
			for(let i=0;i<data.length;i++){
				number += data[i].count;
				
			}
			var aspan=`<span class="gnumber">${number}<span>`;
			$(".gouwu").append(aspan);
		}
		
		
	});
	 
	$(".gouwu").on("click",function(){
		window.location.href="http://localhost/guomei/html/shoop.html";
	});
	var a = getCookie("name");
	console.log(a);
	if(a!=undefined){
		$("header .neirong ._left li").css({"display":"none"});
		var aname = getCookie("name");
		var lai = `<li class="names">Hi,${aname}</li>`;
		var lli = `<li><input type="submit" class="lli" value="注销"></li>`;
		$("header .neirong ._left").append(lai);
		$("header .neirong ._left").append(lli);
		$(".lli").on("click",function(){
			removeCookie("name");
			removeCookie("token");
			
			window.location.reload()
		});
	}
});