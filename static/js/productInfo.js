/*
 * s商品详情页js
 * // location.search  //?id=0001
 */

$(function(){
	
	//拿到当前页面id参数
	var idInfo = window.location.search.substring(1);
	//	console.log(idInfo);
	
	//遍历商品信息json数组
	$.get("json/productInfo.json",function(data){
			
		//遍历data数组, 拿到商品信息
		for (var i=0; i<data.length; i++) {
			if(idInfo==data[i].id){
				var obj = data[i]; 
			}
		}
//		console.log(obj);
		//取得对应商品信息
		var id = obj.id; //id
		var type = obj.type;//类型（极速中国仓/韩国直邮/免税仓）
		var  brand = obj.brand;//品牌
		var name = obj.name;//商品名称
		var op = obj.op;//原定价格
		var np = obj.np;//现定价格
		var df = op-np;//优惠价格
		var img = obj.img; //img url
		var infoimg = obj.infoimg
		
		//生成至页面
		$("head title").html(name+"-美美箱Memebox")
		$(".main .showImg").css({"background":"url("+img+")","backgroundSize":"cover"});
		$(".showinfo h1").html(name);
		$(".peiceinfo .op i").html("¥"+op);
		$(".peiceinfo .np i").html("¥"+np);
		$(".main .imgShow").html("<img style='width: 100%;' src="+infoimg+"/>");
		
		
		//放大镜图片
			$("#bigImg").attr('src',img);
		
		//购物车输入框页面逻辑处理
		$(".buy input").val(1);//默认
		
		//减少
		$("#less").click(function(e){
			e.preventDefault();
			var i = $(".buy input").val();
			if(i<=1){
				
			}else{
				$(".buy input").val(i-1);
			}
		})
		//增加
		$("#more").click(function(e){
			e.preventDefault();
			var i = $(".buy input").val();
			var j=	parseInt(i)+1;
			$(".buy input").val(j);
			//console.log(j)
		})
		
	
	//修改cookie
		//对购物车的修改的事件监听
		//减少一件
		$("body").on("click","#putInCars",function(){
			
			var num = parseInt($(".buy #num").val());
			
			if(!isNaN(num)){
				console.log("本次添加数量："+num);
					//执行加入购物车函数
				PutInCart(idInfo,data,num);//idInfo为以上拿到的商品id
			}else{
				alert("请输入一个数字哦亲！")
			}
			
			
			//执行更新侧边栏购物车数值函数
			//makeCart();
			
			//初始化输入框数值
			$(".buy #num").val(1);
			
			
		})
	})
	
		
				//放大镜
				var _smallImg = $("#smallImg"); //小图
				var _smallArea = $("#smallArea"); //小区域
				var _bigImg = $("#bigImg"); //大图
				var _bigArea = $("#bigArea"); //大区域
				
				//bigImg.width / smallImg.width = bigArea.width/smallArea.width
				//smallArea.width = bigArea.width * smallImg.width / bigImg.width
				//计算小区域的宽高
				//width() == innnerWidth() == outerWidth()
				_smallArea.width( _bigArea.width() * _smallImg.width() / _bigImg.width() );
				_smallArea.height( _bigArea.height() * _smallImg.height() / _bigImg.height() );
				
				//放大系数/放大倍数
				var scale = _bigImg.width() / _smallImg.width();  
				//scale = 4
				
				
				//mousemove
				_smallImg.mousemove(function(e){
					_smallArea.show(); //显示小区域
					_bigArea.show()//显示大区域
					
					//clientX: 可视区域的x值
					//pageX: 距离窗口左边的x值
					var x = e.pageX - _smallImg.offset().left - _smallArea.width()/2;
					var y = e.pageY - _smallImg.offset().top - _smallArea.height()/2; 
					//console.log(e.clientX);
					//console.log(e.pageX);
					
					//控制小区域范围在小图内
					if (x <= 0) { //不超出左边
						x = 0;
					}
					else if (x >= _smallImg.width()-_smallArea.width()) { //不超出右边
						x = _smallImg.width()-_smallArea.width();
					}
					if (y <= 0) { //不超出上边
						y = 0;
					}
					else if (y >= _smallImg.height()-_smallArea.height()) { //不超出下边
						y = _smallImg.height()-_smallArea.height();
					}
					
					
					//移动小区域
					_smallArea.css({left: x, top: y});
					
					//移动大图
					_bigImg.css({left: -x*scale, top: -y*scale});
					
				})
				
				
				//mouseleave
				_smallImg.mouseleave(function(){
					_smallArea.hide(); //隐藏小区域
					_bigArea.hide()//隐藏大区域
				})
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		//商品点击加入购物车函数	
		//data是ajax拿到的json商品列表
		//goodsId是当前添加的商品id
		
		function PutInCart(goodsId,data,numbers){
			//console.log("点击到button了！");
				//拿到当前商品id
				//console.log(goodsId);
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
								cart[j].num +=numbers; //本次添加的商品数量，参数
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
								num: numbers //本次添加的商品数量，参数
							}
							cart.push(goods);
						}
						//console.log(isExist)
					}
				}
				//保存到cookie中
				$.cookie("cart", JSON.stringify(cart), {expires:30, path:"/"});
				//console.log( $.cookie("cart") );
				
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

	
	
	
	
	
	
	
	
	
	
//	加载完成函数结尾
})