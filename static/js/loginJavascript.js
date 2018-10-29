/*
 * 登录页面js文件
 * 
 */
$(function(){
	
	var errMage = $(".content ul li").eq(0).find("input");	//错误信息提示框，默认隐藏
	
	//先获取最近一次注册的用户做便捷登录
		if($.cookie("users")){
			var users = JSON.parse($.cookie("users"));
			$("input:eq(1)").val(users[users.length-1].name) ; 
			$("input:eq(2)").val(users[users.length-1].pwd) ;
		}
	
		//点击登录按钮验证是否登录成功
		$("input:eq(3)").click(function(){
			
			//获取cookie中注册过的所有用户
			if (users) {
				//遍历查找是否有匹配的用户
				var isExist = false; //表示是否存在该用户
				for (var i=0; i<users.length; i++) {
					if ( $("input:eq(1)").val() == users[i].name && $("input:eq(2)").val() == users[i].pwd ) {
						console.log("登录成功!");
						isExist = true; //表示存在该用户,允许登录
						
						//修改登录状态
						users[i].status =1;
						$.cookie("users", JSON.stringify(users), {expires:30, path:"/"});
						console.log( $.cookie("users") );
						
						document.location="./HomePage.html";//跳转至主页
						
					}
				}
			
			if (!isExist) {
				console.log("用户名或密码错误!");
				errMage.stop().slideDown(500).val("用户名或密码错误！")
			}
			
		}else{
			console.log("账号不存在，请先注册！")
			errMage.stop().slideDown(500).val("账号不存在，请先注册！！")
		}
	})
	
	
	
	
})