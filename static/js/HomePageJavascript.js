/*
 * 主页js文件
 * 
 * 
 */

$(function(){
	
	
	
	//轮播图
	//1, 获取数据
	$.get("json/lunbo.json", function(data){
		
//		console.log(data);
		
		//2, 显示数据到页面上
		//遍历data数组, 将每个图片显示在页面上
		for (var i=0; i<data.length; i++) {
			var obj = data[i]; 
			var img = obj.img; //img
			var href = obj.href;//href
			var id = obj.id; //id
			
			//将创建的节点添加到页面上
			$("#list").append( "<li><a href="+href+"><img src=" + img +" /></a></li>" );
			$("#list2").append( "<li></li>" );
			
			//初始化把第一个li的样式变成选中状态
			if (i == 0) {
				$("#list2>li").css("background","rgb(255,80,115)");
			}
		}
		
		//开启自动轮播
		lunbo();
	})
	
	
	//轮播图
	function lunbo() {
		//
		var _list1 = $("#list");
		var _list2 = $("#list2");
		var _li1 = $("#list li");
		var _li2 = $("#list2 li");
		
		//复制第1张图到最后
		_li1.first().clone().appendTo(_list1);				
		
		var size = $("#list li").length;
		//console.log(size); //5
		
		var i = 0; //即将显示的图片的下标
		
		//开启定时器, 自动轮播
		var timer = setInterval(function(){
			i++;
			move();
		}, 5000);
		
		//移动
		function move(){
			
			//如果超出左边界
			if (i < 0) {
				_list1.css("left", -(size-1)*1480); //瞬间移动到第5张图(i=4的图片)
				i = size-2; //即将移动到第4张图(i=3的图)
			}
			
			//如果超出右边界
			if (i >= size) {
				_list1.css("left", 0); //瞬间移动到第1张图(非动画)
				i = 1; //即将移动到第2张图(i=1的图)
			}
			
			//动画移动
			_list1.stop().animate({left: -i*1480}, 500);
			
			//更改按钮的选中状态
			_li2.css("background","white").eq(i).css("background","rgb(255,80,115)");
			if (i == size-1) {
				_li2.css("background","white").eq(0).css("background","rgb(255,80,115)");
			}
		}
		
//					//上一页
//					$("#left").click(function(){
//						i--;
//						move();
//					})
//					
//					//下一页
//					$("#right").click(function(){
//						i++;
//						move();
//					})
		
		//按钮的移入事件
		_li2.mouseenter(function(){
			i = $(this).index();
			move();
		})
		
		
		$("#box").hover(
			function(){ //mouseenter
				clearInterval(timer); //停止定时器
			},
			function(){ //mouseleave
				clearInterval(timer);
				timer = setInterval(function(){
					i++;
					move();
				}, 3000)
				
		})
		
	}
//	以上为轮播图js
	
	
	
	

	//轮播图处左侧导航栏鼠标移入移出显示隐藏部分
	$(".leftnav>ul>li").hover(function(){
		//console.log($(this).index());
		$(this).css("background","white");
		$(this).children().css("color","rgb(255,80,115)");//最外层hover
		var hideUl = $(this).find("ul");
		if(hideUl){
			hideUl.show();//显示外层ul
			hideUl.find("li").hover(function(){
				$(this).find("a").css("color","rgb(255,80,115)")//里层li hover样式变化
				},function(){
					$(this).find("a").css("color","#666")
				})
			}
		},function(){
			$(this).css("background","rgba(25,25,25,0)");
			$(this).children().css("color","white");
			var hideUl = $(this).find("ul");
			if(hideUl){
			hideUl.hide()
			}	
	})




	//以下为中部商品列表数据加载js
		$.get("json/productInfo.json",function(data){
			
			//遍历data数组, 拿到商品信息
			for (var i=0; i<data.length; i++) {
				var obj = data[i]; 
//				console.log(obj);
				
				var id = obj.id; //id
				var type = obj.type;//类型（极速中国仓/韩国直邮/免税仓）
				var  brand = obj.brand;//品牌
				var name = obj.name;//商品名称
				var op = obj.op;//原定价格
				var np = obj.np;//现定价格
				var df = op-np;//优惠价格
				var img = obj.img; //img url
				
				//	生成商品
				//生成a标签
				var a = $("<a href=productInfo.html?"+id+" title="+name+" target='_blank'></a>");
				//判断类型分类存放li
				if(type==1){
					var typeSpan = $("<span></span>").addClass("type").css("background","url(img/productInfo-img/goods-local.png)");
				}else{
					var typeSpan = $("<span></span>").addClass("type").css("background","url(img/productInfo-img/goods-global.png)");
				}
				
				var  imgSpan = $("<img src="+img+" alt="+name+">");
				a.append(typeSpan).append(imgSpan);
				$("<h4>"+brand+"</h4>").addClass("goodsh4").appendTo(a);
				$("<h4>"+name+"</h4>").addClass("goodsh3").appendTo(a);
				
				//生成 .goodsPrice 容器
				var goodsPrice = $("<div></div>").addClass("goodsPrice");
				var npSpan = $("<span>¥"+np+".00</span>").addClass("newPrice"); 
				
				//判断类型分类存放li
				if(op==np){
						var opSpan = $("<span>美美箱优惠价</span>").addClass("mmPrice")
				}else{
						var opSpan = $("<span>¥"+op+".00</span>").addClass("oldPrice"); 
				}
				
				var dfSpan = $("<span>立省¥"+df+".00</span>").addClass("df"); 
				var btn = $("<button type='button' title='加入购物车' id="+id+">加入购物车</button>");
				goodsPrice.append(npSpan).append(opSpan).append(dfSpan).append(btn);
				
				//生成li 加入ul
				var goodsLi = $("<li></li>").append(a).append(goodsPrice);	
				$(".goodsListBox>.fastChinaCang>ul").append(goodsLi.clone());
				$(".goodsListBox>.KoreaSouth>ul").append(goodsLi.clone());
				$(".goodsListBox>.duty_free>ul").append(goodsLi.clone());
			}
			//问题：json生成的dom结构，对其操作的代码块放在其他地方无效
			//解决：放在json生成dom结构的大函数体内
			//原因:???
			
			
			
			
			//点击加入购物车
			$(".goodsPrice>button").bind("click",function(){
				var goodsId = $(this).attr("id");//获得id
				
				PutInCart(goodsId,data,1);//调用函数
				
			})	
			//json大函数结尾	
		})
			
			
		//以上为中部商品列表数据加载js
			
			
			
			
			
		//商品点击加入购物车函数	
		//data是ajax拿到的json商品列表
		//goodsId是当前添加的商品id
		
		function PutInCart(goodsId,data,numbers){
			//console.log("点击到button了！");
				//拿到当前商品id
				//console.log("当前商品id:"+goodsId);
				//拿到商品信息
				for (var i=0; i<data.length; i++) {
					if(goodsId==data[i].id){
						var obj = data[i]; 
						//console.log("当前商品："+obj.name);
						
						var goodsId = obj.id; //id
						var goodsType= obj.type;//类型（极速中国仓/韩国直邮/免税仓）
						var  goodsBrand = obj.brand;//品牌
						var goodsName = obj.name;//商品名称
						var goodsPrice = obj.np;//现定价格
						var goodsImg= obj.img; //img url
						
						var cart = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];
						
						//遍历查找是否之前的购物车cookie中存在即将添加的商品
						var isExist = false; //表示是否存在该商品
						for(var j=0; j<cart.length; j++) {
							//如果存在该商品, 把数量增加
							if (goodsId == cart[j].id) {
								cart[j].num+=numbers;
								isExist = true; //表示存在该商品
							}
						}
						
						//如果不存在, 则添加一个新商品
						if (!isExist) {
							//商品对象
							var goods = {
								id: goodsId,
								brand:goodsBrand,
								type:goodsType,
								name: goodsName,
								price: goodsPrice,
								img:goodsImg,
								num: 1 //商品数量
							}
							cart.push(goods);
						}
						//console.log(isExist)
					}
				}
				//保存到cookie中
				$.cookie("cart", JSON.stringify(cart), {expires:30, path:"/"});
				//console.log( $.cookie("cart") );
				
				//再次刷新购物车
				makeCart();
				
		}
		//封装函数结尾
		
		
		function makeCart(){
						
						//初始化
						$(".cartContent>ul").html("");
						
						var cart = $.cookie("cart");
						if (cart) {
							cart = JSON.parse(cart); 
							
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
			
		
		
	
	
	
	
	
	
	



//加载完成函数结尾
})
