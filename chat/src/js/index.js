define(function(require,exports,module){
	require("zepto");
	

	$(function(){
		var App=function(){

			this.socket=io.connect("http://localhost");
			this.init();
			this.chatBtn();//点击发送 开始聊天
		};

		App.prototype={
			init:function(){
				
			},
			chatBtn:function(){
				var self=this;

				$("#submit_btn").on("click",function(){
					var val=$("#footer_input").val();
					console.log(val);
					self.socket.on("data",function(data){
						console.log(data);
						self.socket.emit('sendData', { my:val});
					});

				});
				
			}
		}

		app=new App();
	});
});