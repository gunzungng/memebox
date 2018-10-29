/*
 * 购物车js文件
 * 
 * 
 */
$(function(){
	
	//初始化生成购物车列表页面
	makeTable();
	
	
	$("body").on("click",".substract",function(){
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
						
						makeTable();//生成购物车表格
						
						makeCart();//生成侧边栏购物车
				}
			}
		}
	})
	
	//点击增加一件
	$("body").on("click",".plus",function(){
		//console.log('执行点击减少一件委托函数')
		var cart = $.cookie("cart");
		if (cart) {
			cart = JSON.parse(cart); 
			var liId = $(this).parent().parent().parent().attr("id");
			console.log(liId)
			for (var  n=0;n<cart.length;n++) {
				if(cart[n].id==liId){
						cart[n].num++;
						
						//更新cookie，再次执行函数生成购物车
						$.cookie("cart", JSON.stringify(cart), {expires:30, path:"/"});
						
						console.log($.cookie("cart"));
						
						makeTable();//生成购物车表格
						
						makeCart();//生成侧边栏购物车
				}
			}
		}
	})

	//删除所有该商品
	$("body").on("click","#deleTr",function(){
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
						
						makeTable();//生成购物车表格
						
						makeCart();//生成侧边栏购物车
						
				}
			}
		}
	})
	
	//清空购物车
	$("body").on("click",".deleAll",function(){
		//更新cookie，再次执行函数生成购物车
		$.cookie("cart","",{expires:0, path:"/"});
		
		makeTable();//生成购物车表格
		
		makeCart();//生成侧边栏购物车
		
		window.location='cart.html';//刷新页面更新数据
		
	})

	
	
	
	//表格生成函数
	function makeTable(){
							
			//初始化
			$("table tbody").html("");
			
			var cart = $.cookie("cart");
			if (cart) {
				cart = JSON.parse(cart); 
				
				
				var pricesumCHA = 0;
				var pricesumKOR = 0;
				var pricesumALL = 0;
				
				for(var k=0;k<cart.length;k++){
					var sId = cart[k].id;
					var stype = cart[k].type;
					var sbrand = cart[k].brand;
					var sname =  cart[k].name;
					var sprice = cart[k].price;
					var  simg = cart[k].img;
					var snum = cart[k].num;
					
					//生成dom结构
					var tr = $("<tr id="+sId+"></tr>");
					var td1 = $("<td></td>").append('<a href="productInfo.html?'+sId+'" title="'+sname+'"><img src="'+simg+'"></a>').append('<h2><a href="productInfo.html?'+sId+'">'+sbrand+'<br/>'+sname+'</a></h2>')
					var td2 = $("<td></td>").html("--");
					var td3 = $("<td></td>").html('¥'+sprice+'.00');
					var td4box = $('<div></div>').append('<button class="substract">-</button>').append('<input value="'+snum+'" readonly="true" type="text">').append('<button class="plus">+</button>');
					var td4 = $('<td class="carChangeNum"></td>').append(td4box);
					var td5 = $(' <td>¥'+sprice*snum+'.00</td>').addClass("pricesm");
					var td6 = $('<td><a href="#">移入我的收藏</a><a href="#" id="deleTr">删除</a></td>');
					tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6);
					//分仓生成
					if(stype==1){
						$(".china tbody").append(tr);
						pricesumCHA += sprice*snum;
					}else{
						$(".Korea tbody").append(tr);
						pricesumKOR += sprice*snum;
					}
										
					//计算
					pricesumALL = pricesumCHA+pricesumKOR;
					
				}
				//改变初始化样式
//				if($('.Korea tbody').html()==""){
//						$('.Korea tbody').append($('<tr class="hidenull"><td style="text-align: center;" colspan="6">这里空空如也！</td></tr>'))
//					}
				
				$(".china tfoot span").html('¥'+pricesumCHA+'.00');
				$(".Korea tfoot span").html('¥'+pricesumKOR+'.00');
				$(".Korea tfoot span").html('¥'+pricesumKOR+'.00');
				$('.allgp span').html('¥'+pricesumALL+'.00');
				
			}
			
			
			
			
			

			
		}//封装函数结尾
	
	


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
