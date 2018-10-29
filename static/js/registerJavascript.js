/*
 * 注册页面js文件
 * 
 */

$(function(){
	var errMage = $(".content ul li").eq(0).find("input");	//错误信息提示框，默认隐藏
	
	//用户名验证
	$(".content ul li").eq(1).find("input").blur(function(){
		var  nameVal = $(".content ul li").eq(1).find("input").val();
//		var  passwordVal = $(".content ul li").eq(2).find("input").val();
		if(nameVal==""){
		}else if(!(/^1[34578]\d{9}$/.test(nameVal))){
			errMage.stop().slideDown(500).val("手机号格式不正确！")
		}else if(errMage.is(":hidden")){}else{
				errMage.stop().slideUp(500)//这个else if用来再次判断用户名正确时隐藏错误信息提示
				}
			//完成cookie查询
	})
	
	//密码验证
	$(".content ul li").eq(2).find("input").blur(function(){
		var  passwordVal = $(".content ul li").eq(2).find("input").val();
		if(passwordVal==""){
		}else if(!(/^(\w){6,16}$/.test(passwordVal))){
			errMage.stop().slideDown(500).val("密码格式不正确！")
		}else{
			if(errMage.is(":hidden")){}else{
				errMage.stop().slideUp(500)
			}
		}
	})
	
	//验证码	
	 $.idcode.setCode()	;	//验证码插件函数初始化加载验证码
	 $(".content ul li").eq(3).find("input").blur(function(){
	 	if($(".content ul li").eq(3).find("input").val()==""){
	 	}else if($.idcode.validateCode()){
			if(errMage.is(":hidden")){}else{
				errMage.stop().slideUp(500)
			}
		}else{
			errMage.stop().slideDown(500).val("验证码错误！");
			$.idcode.setCode()	;
		}
	})	
	
	//不为空及是否注册成功验证
	$(".content ul li").eq(4).find("input").click(function(){
		//从cookie用户列表中判断用户名是否已经存在
		
		//先获取之前保存在cookie中的用户
		var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
		
		//遍历users数组, 判断是否存在该用户,如果存在则不能注册
			for(var i=0; i<users.length; i++) {
				if (  $(".content ul li").eq(1).find("input").val() == users[i].name ) {
					console.log("该用户已经存在, 不能注册!");
					errMage.stop().slideDown(500).val("该用户已经存在, 不能注册!！");
					return;
				}
			}
		
		if($(".content ul li").eq(1).find("input").val()==""){
			errMage.stop().slideDown(500).val("手机号不能为空！")
		}else if($(".content ul li").eq(2).find("input").val()==""){
			errMage.stop().slideDown(500).val("密码不能为空！")
		}else if($(".content ul li").eq(3).find("input").val()==""){
			errMage.stop().slideDown(500).val("验证码不能为空！")
		}else if(errMage.is(":hidden")){
			
			//将注册数据转存至cookie
			var user = {
						name:  $(".content ul li").eq(1).find("input").val(), //用户名
						pwd:  $(".content ul li").eq(2).find("input").val() ,//密码
						status: 0
					}
					users.push(user); //添加新用户
					
					//保存到cookie中
					$.cookie("users", JSON.stringify(users), {expires:30, path:"/"});
					console.log( $.cookie("users") );
					
					alert("恭喜注册成功，点击确定自动跳转至登录页面！");
					document.location="./login.html";//跳转页面
					
		}
	 })	
	  
//加载完成函数结尾
})
