/*
 * 公共Javascript
 */

$(function(){
	
		
	//通过cookie判断是否为登录状态，修改用户信息样式
		if($.cookie("users")){
			var users = JSON.parse($.cookie("users"));
			//遍历user 查看是否为登录状态
			for (var i=0; i<users.length; i++) {
				if(users[i].status==1){
					//已登录，用户为users[i]
					if($(".header_top_right>span>a")){
						//如果需要更改样式的头部存在
						(function(index){
							$(".header_top_right>span").eq(0).find("a").html("退出").attr("href","#").bind("click",function(e){
								//退出则更改cookie登录状态
								e.preventDefault();
								console.log(users)
								users[index].status = 0;
								$.cookie("users", JSON.stringify(users), {expires:30, path:"/"});
								document.location="./HomePage.html";//跳转至主页
							});
							//浏览器关闭也视为退出登录
//							window.onunload=function(){
//								users[index].status = 0;
//								$.cookie("users", JSON.stringify(users), {expires:30, path:"/"});
//							}
						})(i)
						$(".header_top_right>span").eq(1).find("a").html(users[i].name).attr("href","#");
					}
					
					
				
				
				
				
				
				
					//购物车列表信息展示
					//初始化购物车件数
					//$("#cart_logo").css("height","140px")
					
					function makeCart(){
						
						//console.log("刷新购物车！")
						
						//初始化
						$(".cartContent>ul").html("");
						
						var cart = $.cookie("cart");
						if (cart) {
							cart = JSON.parse(cart); 
							
							//cars  :
							//[
							//	{"id":"0004","brand":"Pony Effect","type":1,"name":"PONY水漾光泽口红","price":85,"img":"img/product-img/0004.jpg","num":1},
							//	{"id":"0006","brand":"JAYJUN","type":1,"name":"东方柔顺发质护发素","price":127,"img":"img/product-img/0006.jpg","num":2}
							//]
							
	//						<li>
	//								<p>phtml</p>
	//								<div class="smImg"><img src="img/product-img/0002.png"/></div>
	//								<div class="smInfo">
	//									<a class="smAgo" href="productInfo.html？xxxx">Pony&nbsp;青春幻彩系列面膜</a>
	//									<div class="smChangeNum">
	//										<i class="smLess"></i><span >0</span><i class="smMore"></i>
	//									</div>
	//									<div class="smPrice">
	//										<span>¥199.00</span>
	//									</div>
	//									<i class="smDele"></i>
	//								</div>
	//							</li>
							
							var goodsnum = 0;
							var pricesum = 0;
							
							for(var k=0;k<cart.length;k++){
								var sId = cart[k].id;
								var phtml = cart[k].type==1?"中国仓":"韩国仓";
								var sbrand = cart[k].brand;
								var sname =  cart[k].name;
								var sprice = cart[k].price;
								var  simg = cart[k].img;
								var snum = cart[k].num;
								
								//生成dom结构
								var  smInfobox = $('<div class="smInfo"></div>');
								var  smChangeNumbox = $('<div class="smChangeNum"></div>').append($('<i class="smLess"></i><span >'+snum+'</span><i class="smMore"></i>'));
								var  smPricebox = $('<div class="smPrice"></div>').append($('<span>¥'+sprice+'.00</span>'))
								smInfobox.append($('<a class="smAgo" href="productInfo.html?'+sId+'">'+sbrand+sname+'</a>')).append(smChangeNumbox).append(smPricebox).append('<i class="smDele"></i>');
								var li = $("<li id="+sId+"></li>").append($("<p>"+phtml+"</p>")).append($('<div class="smImg"><img src="'+simg+'"></div>')).append(smInfobox);
								$(".cartContent>ul").append(li)
								
								//计算
								goodsnum +=snum;
								pricesum += sprice*snum;
								
							}
							//改变初始化样式
							$("#cart_logo .carnum").html(goodsnum);
							$(".cartFoot .cart-sumNum").html(goodsnum);
							$(".cartFoot .cart-sumPrice").html("¥"+pricesum+".00")
						}
						
					}//封装函数结尾
					
					

					makeCart();//进入页面初始化调用函数 产生购物车数据
					
					
					
					//对购物车的修改的事件监听
					//减少一件
					$("body").on("click",".smLess",function(){
						//console.log('执行点击减少一件委托函数')
						var cart = $.cookie("cart");
						if (cart) {
							cart = JSON.parse(cart); 
							var liId = $(this).parent().parent().parent().attr("id");
							//console.log(liId)
							for (var  n=0;n<cart.length;n++) {
								if(cart[n].id==liId&&cart[n].num>1){
										cart[n].num--;
										
										//更新cookie，再次执行函数生成购物车
										$.cookie("cart", JSON.stringify(cart), {expires:30, path:"/"});
										
										makeCart()
								}
							}
						}
					})
					//增加一件
					$("body").on("click", ".smMore",function(){
						//console.log('执行点击增加一件委托函数');
						var cart = $.cookie("cart");
						if (cart) {
							cart = JSON.parse(cart); 
							var liId = $(this).parent().parent().parent().attr("id");
							//console.log(liId)
							for (var  n=0;n<cart.length;n++) {
								if(cart[n].id==liId){
										cart[n].num++;
										
										//更新cookie，再次执行函数生成购物车
										$.cookie("cart", JSON.stringify(cart), {expires:30, path:"/"});
										makeCart()
										
								}
							}
						}
					})
					
					//删除所有该商品
					$("body").on("click",".smDele",function(){
						//console.log('执行点击删除一类委托函数')
						var cart = $.cookie("cart");
						if (cart) {
							cart = JSON.parse(cart); 
							var liId = $(this).parent().parent().attr("id");
							//console.log(liId)
							for (var  n=0;n<cart.length;n++) {
								if(cart[n].id==liId){
										cart.splice(n,1);
										
										//更新cookie，再次执行函数生成购物车
										$.cookie("cart", JSON.stringify(cart), {expires:30, path:"/"});
										makeCart()
										
								}
							}
						}
					})
					
					
					
					
					
					
					
					
					//确认用户登录判断结尾
				}
			}
		}
			
			
	
	
	
	//公共头部导航栏nav鼠标移入移出显示隐藏部分
	$(".header .header_bottom .nav ul>li").hover(function(){
		//console.log($(this).index());
		var hideUl = $(this).find("ul");
		if(hideUl){
			hideUl.stop().fadeIn(300);//显示里层ul
			hideUl.find("li").hover(function(){
				$(this).find("a").css("color","rgb(255,80,115)")//里层li hover样式变化
				},function(){
					$(this).find("a").css("color","#666")
				})
			}
		},function(){
			var hideUl = $(this).find("ul");
			if(hideUl){
			hideUl.stop().fadeOut(300)
			}	
	})
	
		//右边固定侧边栏的a鼠标移入显示动画
	$(".windowRigtht ul li a").hover(function(){
		//console.log($(this).index());
		var antb = $(this).find(".animateBox");
		if(antb){
				antb.stop().show().animate({right:"34px"},300)
			}
	},function(){
		var antb = $(this).find(".animateBox");
		if(antb){
			antb.stop().hide().css("right","64px")
		}
	})

	//右边固定侧边栏的goTop滚动监听及变化
	 $(window).scroll(function(){  
	 	var goTop = $(".windowRigtht #goTop_logo");
	    if ($(window).scrollTop()>165){  
	            goTop.stop().show();  
	        }  
	    else  
	        {  
	            goTop.stop().hide();  
	        }  
	        //点击回到顶部
	        goTop.click(function(e){  
	        	$('body').stop().animate({scrollTop:0},500);  
	       		e.preventDefault();
	    });  
	})
	 
	 //右边固定侧边栏的购物车隐藏状态监听及变化
	$("#cart_logo").click(function(e){
		e.preventDefault();
		$(".fixedCart").stop().animate({"right":"40px"},500)
	})
	$(".fixedCartLogo").click(function(){
		$(".fixedCart").stop().animate({"right":"-290px"},300)
	})
	
	
	













//	加载完成函数结尾
})
