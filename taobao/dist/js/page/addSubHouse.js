
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
			this.addSubhouse();//添加子楼盘
		};

		App.prototype={
			init:function(){

			},
			addSubhouse:function(){
				var self=this;
				$("#formConfirm").on("click",function(){
					var $subHouse=$("#subName");
					var subName=$subHouse.val();
					if(subName){
						parent.app.createSubhouse(subName);
						parent.layer.closeAll();
					}
					else{
						parent.layer.msg("楼盘名称不能为空");
					}
					
				})
			}
		};

		app=new App();
	});
});

