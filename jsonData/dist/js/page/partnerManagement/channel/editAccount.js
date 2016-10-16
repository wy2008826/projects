/*
 *
 * 订单贷
 * @name 渠道管理-新增渠道商
 *
 */

 define(function(require,exports,module){

   require("jquery");
   

   $(function(){
   	var App=function(){
   		var weburl=$("#webUrl").val();

	      this.url={
	        	webUrl:weburl,
	      };
	      

	      this.init();//页面初始化准备工作
	      this.validateForm();//验证提交页面数据
	      this.closeBtn();//关闭弹框
   	};

   	App.prototype={
   		init:function(){
	        var self=this;

	      },
	      validateForm:function(){
	      	var self=this;

	      	require.async("jqueryForm",function(){
		      	require.async("jqueryValidate",function(){
			         require.async("jqueryValidateAdditional",function(){

			         	$.validator.addMethod("selectArea",function(value,elements){
			         		if(value=="请选择"||value=="-请选择-"||value==""){
			         			return false;
			         		}
			         		else{
			         			return true;
			         		}
			         	});

			            self.validater=$("#addAcountForm").validate({
			              	errorClass:"error-label",
			              	onkeyup:function(inp){//键盘抬起执行单个输入框验证
			                	self.validater.element(inp);
			              	},
			              	rules:{
			                	accountName:{
			                  	required: true,
			                  	maxlength:30
			                	},
			                	bankName:{
			                  	required: true,
			                  	maxlength:30
			                	},
			                	bankBranch:{
			                  	required: true,
			                  	maxlength:30
			                	},
			                	card:{
			                  	required: true,
			                  	pattern:/^\d{15,20}$/,
			                	},
			                	accountType:{
			                  	required: true,
			                  	maxlength:30,
			                  	selectArea:true
			                	},
			                	remark:{
			                		required: true,
			                		maxlength:60
			                	},
			              	},
			              	messages:{
			                	accountName:{
			                  	required:"账户名称不能为空",
			                  	maxlength:"账户名称不能大于30个字符",
			                	},
			                	bankName:{
			                  	required:"开户银行不能为空",
			                  	maxlength:"开户银行不能大于30个字符"
			                	},
			                	bankBranch:{
			                		required:"支行不能为空",
			                		maxlength:"支行不能大于30个字符"
			                	},
			                	card:{
			                		required:"银行卡号不能为空",
			                		pattern:"银行卡号格式不正确"
			                	},
			                	accountType:{
			                		required:"请选择账户类型",
			                		selectArea:"请选择账户类型"
			                	},
			                	remark:{
			                		required:"备注不能为空",
			                		maxlength:"备注最多为60个字符"
			                	},
			              	},
			              	errorPlacement:function(error,elem){
			                  var inpId=$(elem).attr("id");
			                  $("#formError").html(error);
			              	},
			              	success:function(element){
					            $("#formError").html('');
					        	},
			              	submitHandler: function(form){
			              		$(form).ajaxSubmit({
			              			type:"post",
					               dataType:'json',
					               success:function(data){
					               	if(data.result){
					               		parent.frames[0].app.loadList(data);
					               		parent.layer.closeAll();
					               	}
					               	else{
					               		parent.layer.msg(data.msg);
					               	}
					               },
					               error:function(){
					               	
					               }
			              		});

			              		return ;
			              	},
			            });
			         });
		        	});
				});
	      },
	      closeBtn:function(){
	      	$("#cancleBtn").on("click",function(){
	      		parent.layer.closeAll();
	      	})
	      }
   	};

   	app=new App();
   });

 });
