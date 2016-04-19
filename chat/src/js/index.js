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
				var socket=io.connect("http://192.168.199.105");
				$("#submit_btn").on("click",function(){
					var val=$("#footer_input").val();
					console.log(val);
					$.ajax({
						type:"get",
						url:"http://192.168.199.105/chat",
						success:function(data){
							console.log(data);
						},
						error:function(){
							console.log("error");
						}
					});
					
				});
				
				socket.on("data",function(data){
					console.log(data);
					var val=$("#footer_input").val();
					socket.emit('sendData', {my:val});
				});


			}
		}

		app=new App();
	});
});