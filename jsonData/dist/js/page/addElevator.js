
define(function(require,module,exports){
	require("jquery");
	$(function(){

		var App=function(){

			this.url={
				a:"a.html",
			};

			this.tpl={
				// subWraperTpl:_.template($("#subWraperTpl").html())
			};


			this.init();//页面初始化
			this.addElevator();//添加电梯
		};

		App.prototype={
			init:function(){

			},
			addElevator:function(){
				var self=this;
				$("#formConfirm").on("click",function(){
					var $elevatorName=$("#elevatorName");
					var $elevatorNum=$("#elevatorNum");

					var elevatorName=$elevatorName.val();
					var elevatorNum=$elevatorNum.val();

					if(elevatorName&&elevatorNum){
						parent.app.createElevator({
							elevatorName:elevatorName,
							elevatorNum:elevatorNum,
							subHouseId:$("#subHouseId").val()
						});
						parent.layer.closeAll();
					}
					else{
						if(!elevatorName){
							parent.layer.msg("电梯名称不能为空");
						}
						if(!elevatorNum){
							parent.layer.msg("电梯可用墙面数不能为空");
						}
					}
					
				})
			}
		};

		app=new App();
	});
});

