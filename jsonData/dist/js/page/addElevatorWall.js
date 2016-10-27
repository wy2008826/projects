
define(function(require,module,exports){
	require("jquery");
	require("layDate");
	$(function(){

		var App=function(){

			this.url={
				a:"a.html",
			};

			this.tpl={
				// subWraperTpl:_.template($("#subWraperTpl").html())
			};


			this.init();//页面初始化
			this.initDate();//时间插件初始化
			this.submitElevatorWall();//修改电梯墙面广告信息
		};

		App.prototype={
			init:function(){

			},
			initDate:function(){
				var self=this;
				var self=this;
				var start={
				  	elem: '#wallCooperStart',
				  	format: 'YYYY-MM-DD',
		          	choose: function(datas){
		            	end.min = datas; //开始日选好后，重置结束日的最小日期
		            	end.start = datas //将结束日的初始值设定为开始日
		          	}
				};
				var end={
				  	elem: '#wallCooperEnd',
				  	format: 'YYYY-MM-DD',
		          	choose: function(datas){
		            	start.max = datas;
		          	}
				}

				laydate(start);
				laydate(end);
			},
			submitElevatorWall:function(){
				var self=this;
				$("#formConfirm").on("click",function(){
					var $wallCompanyName=$("#wallCompanyName");
					var $wallCompanyPhone=$("#wallCompanyPhone");
					var $wallCooperStart=$("#wallCooperStart");
					var $wallCooperEnd=$("#wallCooperEnd");
					var $cooperType=$("#cooperType");

					var wallCompanyName=$wallCompanyName.val();
					var wallCompanyPhone=$wallCompanyPhone.val();
					var wallCooperStart=$wallCooperStart.val();
					var wallCooperEnd=$wallCooperEnd.val();
					var cooperType=$cooperType.val();

					parent.app.addElevatorWallData({
						wallCompanyName:wallCompanyName,
						wallCompanyPhone:wallCompanyPhone,
						wallCooperStart:wallCooperStart,
						wallCooperEnd:wallCooperEnd,
						cooperType:cooperType,
						houseTimeStap:$("#houseTimeStap").val(),
						elevatorTimeStap:$("#elevatorTimeStap").val(),
						index:$("#index").val(),
					});
					parent.layer.closeAll();
					
					
				})
			}
		};

		app=new App();
	});
});

