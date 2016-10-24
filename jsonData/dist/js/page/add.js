
define(function(require,module,exports){
	require("jquery");
	$(function(){

		var App=function(){

			this.init();
			this.citySelect();
			this.addEvelator();
		};

		App.prototype={
			init:function(){

			},
			citySelect:function(){
				var self=this;
				require.async("cxSelect",function(){
					$('#groupSelect').cxSelect({
						url: 'js/plugin/cxSelect/cityData.min.js',
					  	selects: ['province', 'city', 'area']
					});

				});
			},
			addEvelator:function(){
				var self=this;

				require.async("jqueryForm",function(){
					require.async("jqueryValidate",function(){
						self.validate=$("#addForm").validate({
							rules:{
								city:{
									required:true
								},
								area:{
									required:true
								},
								loupan:{
									required:true
								}
							},
							messages:{
								city:{
									required:"城市为必填项"
								},
								area:{
									required:"区域为必填项"
								},
								loupan:{
									required:"楼盘为必填项"
								}
							},
							submitHandler:function(form){
								$(form).ajaxSubmit(function(data){
									console.log(data);
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

