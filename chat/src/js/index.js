define(function(require,exports,module){
	require("zepto");
	

	$(function(){
		var App=function(){

			this.socket=io("http://localhost:3000/chat");
			this.init();
			this.chatBtn();//点击发送 开始聊天
		};

		App.prototype={
			init:function(){
				console.log(123);
			},
			chatBtn:function(){
				var self=this;

				$("#submit_btn").on("click",function(){
					self.socket.on("news",function(data){
						console.log(data);
						self.socket.emit('sendData', { my: 'data' });
					});
				});
				
			}
		}

		app=new App();
	});
});