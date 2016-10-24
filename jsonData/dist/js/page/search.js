
define(function(require,module,exports){
	require("jquery");
	require("underscore");
	

	$(function(){

		var App=function(){

			this.url={

			};

			this.tpl={
				elevatorTpl:_.template($("#listTpl").html())
			};
			this.init();
			this.searchEvelator();
		};

		App.prototype={
			init:function(){

			},
			loadList:function(){

			},
			searchEvelator:function(){
				var self=this;

				require.async("jqueryForm",function(){
					require.async("jqueryValidate",function(){
						self.validate=$("#searchForm").validate({
							rules:{
								// loupan:{
								// 	required:true
								// }
							},
							messages:{
								// loupan:{
								// 	required:"楼盘为必填项"
								// }
							},
							submitHandler:function(form){
								$(form).ajaxSubmit(function(data){
									console.log(data,typeof data);
									if(data.result){
										var html=self.tpl.elevatorTpl(data);
										console.log(html);
										$("#listBody").html(html).removeClass("hide");
									}
								})
							}
						});
					})

				})

			}
		};

		app=new App();
	});
});

