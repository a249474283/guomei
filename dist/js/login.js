$(function(){

	$("#submit").on("click",function(){
		var username = $("#username").val();
		var password = $("#password").val();
		$.ajax({
			type:"post",
			url:"http://47.104.244.134:8080/userlogin.do",
			data:{'name':username,
				'password':password},
			success:function(data){
				console.log();
				if(data.code==0){
					setCookie("name",username,7);
					setCookie("token",data.data.token,7);
					alert("登录成功");

					window.location.href="index.html";
				}else{
					alert("登录失败");
				}
			}	
		});
	});
});