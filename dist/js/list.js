$(function(){
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/goodsbytid.do",
		data:{
			"tid":13,
			"page":1,
			"limit":9
		},
		success:function(rel){
			console.log(rel.data);
			for(let i=1;i<rel.data.length;i++){
				
				var $figure = $("<figure class='shangpin'></figure>");
				var $img = `<img src=${rel.data[i].picurl}>`;
				var $a = `<a href="#">${rel.data[i].name}</a>`;
				var $span = `<span>￥${rel.data[i].price}</span>`;
				var $submit =`<input type="button" id=${rel.data[i].id} class="submit" value="加入购物车">`;
				$figure.append($img);
				$figure.append($a);
				$figure.append($span);
				$figure.append($submit);
				$(".lista .neirong").append($figure);
			}
			for(let j=0;j<$(".submit").length;j++){
				$(".submit").eq(j).on("click",function(){
					var aid=$(".submit").eq(j).attr("id");
					window.location.href = "details.html?aid="+aid;
				});
			}
		}
	});
	
});