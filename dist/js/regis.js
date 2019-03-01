$(
function(){
	var Name = 0;
	var Word = 0;
	var Words = 0;
	var Emails = 0;
	var Sexs = 0;
	// 用户名验证
	$("#username").on("focus",function(){
		$(".tishi").eq(0).css("display","block");
	});
	$("#username").on("change",function(){
		var vals = $("#username").val();
		if(vals.length<4||vals.length>20){
			$(".tishi").eq(0).html("用户名长度只能在4~20个字符之间").css("color","#f00");
		}else{
			$.ajax({
				type:"get",
				url:"http://47.104.244.134:8080/username.do",
				data:{"username":vals},
				success:function(data){
					if(data.code==0){
						$(".tishi").eq(0).html("用户名已经被使用").css("color","#f00");
					}else{
						$(".tishi").eq(0).html("用户名可用").css("color","#0f0");
						Name++;
					}
				}
			});
			
		}
	});
	
	//密码验证
	$("#password").on("focus",function(){
		$(".tishi").eq(1).css("display","block");
	});
	$("#password").on("input",function(){
		let a = $("#password").val();
		let numbe,xiao,da;
		let rega =/\D/;
		console.log(!rega.test(a));
		if(a.length<6||a.length>20){
			$(".tishi").eq(1).html("长度应为6~20个字符").css("color","#f00");
		}else if(!rega.test(a)){
			$(".tishi").eq(1).html("密码不能为纯数字").css("color","#f00");
		}else{
			$(".tishi").eq(1).html("密码可用").css("color","#0f0");
			Word++;
		}
	});
	
	//密码一致验证
	$("#passwords").on("focus",function(){
		$(".tishi").eq(2).css("display","block");
	});
	$("#passwords").on("change",function(){
		let a = $("#password").val();
		let b = $("#passwords").val();
		if(b!= a){
			$(".tishi").eq(2).html("两次输入密码不一致").css("color","#f00");
		}else{
			$(".tishi").eq(2).html("密码一致").css("color","#0f0");
			Words++;
		}
	});
	
	//邮箱验证
	$("#email").on("change",function(){
		let a = $("#email").val();
		let tage = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		var flag = tage.test(a);
		if(!flag){
			$(".tishi").eq(3).css({"display":"block","color":"#f00"}).html("邮箱格式不正确");
		}else{
			$.ajax({
				type:"GET",
				url:"http://47.104.244.134:8080/username.do",
				data:{"email":a},
				success:function(data){
					console.log(data)
				}
			});
			$(".tishi").eq(3).css({"display":"block","color":"#0f0"}).html("邮箱可用");
			Emails++;
		};
	});
	//性别

	
	$("input[name='sex']").on("change",function(){
		Sexs++;
	});
	
	$("#submit").on("click",function(){
		if(!Name){
			alert("请输入正确的用户名");
		}
		if(!Word){
			alert("请输入正确的密码")
		}
		if(!Words){
			alert("两次密码不一致")
		}
		if(!Emails){
			alert("请输入正确的邮箱");
		}
		if(!Sexs){
			alert("请选择性别");
		}
		console.log(Name+":"+Word+":"+Emails+":"+Sexs);
  		if(Name&Word&Words&Emails&Sexs){
  			var userName = $("#username").val();
			var passWord = $("#password").val();
			var Email = $("#email").val();
			var sex = $("input[name='sex']:checked").val();
			console.log(userName+":"+passWord+":"+Email+":"+sex);
			$.ajax({
				type:"POST",
				url:"http://47.104.244.134:8080/usersave.do",
				data:{'username':userName,
					'password':passWord,
					'email':Email,
					'sex':sex
				},
				success:function(data){
					if(data.msg=="成功"){
						alert("注册成功");
						window.location.href="http://localhost/guomei/login.html";
					}else{
						alert("注册失败");
					}
				}
			});
  		}
	});
});