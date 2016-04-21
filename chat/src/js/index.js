define(function(require,exports,module){
	require("zepto");
	

	$(function(){
		var App=function(){

			
			this.init();
			this.chatBtn();//点击发送 开始聊天
		};

		App.prototype={
			init:function(){
				
			},
			chatBtn:function(){
				var self=this;
				var socket=io.connect("http://192.168.199.105:9000");
				$("#submit_btn").on("click",function(){
					var val=$("#footer_input").val();
					console.log(val);
					
					var now=new Date();
					var h=now.getHours();
					var m=now.getMinutes();
					var s=now.getSeconds();


					var data={
						content:val,
						form:"wy2008826",
						time:h+":"+m+":"+s
					};
					socket.emit('sendData', data);//向服务端发送数据
					
				});
				
				socket.on("data",function(data){//接收到服务端的数据
					console.log(data);
					var val=$("#footer_input").val();
					//socket.emit('sendData', {my:val});

				});


			}
		}

		app=new App();
	});
});