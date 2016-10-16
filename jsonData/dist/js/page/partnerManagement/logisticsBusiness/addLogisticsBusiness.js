/*
 *
 * 订单贷
 * @name 渠道管理-新增物流商
 *
 */

 define(function(require,exports,module){

   require("jquery");
   
   template=require("artTemplate");

   template.helper("accountStatus",function(status){//启用状态
    return status==0?"停用":"正常";
  });

   template.helper("accountType",function(status){//账户类型
    if(status==0){
    	return "共管账户"
    }
    else if(status==1){
    	return "普通账户"
    }
    else if(status==2){
    	return "个人账户"
    }
  });

   template.helper("accountStatusBtn",function(status){//启用状态按钮
    return status==0?"启用":"停用";
  });


   $(function(){
   	var App=function(){
   		var weburl=$("#webUrl").val();
   		var cdnurl=$("#cdnPath").val();
   		var pageTimeStap=this.pageTimeStap=$("#pageTimeStap").val();//页面标示

	      this.url={
	      	cdnUrl:cdnurl,
	        	webUrl:weburl,
	        	cityJs:cdnurl+"/js/plugin/citySelect/city.min.js",//城市数据信息
	        	swf:cdnurl+"/js/plugin/uploadify/uploadify.swf",
	        	addAcount:weburl+"/partnerManagement/addAccount.html?type=1&removeGongGuan=1&pageTimeStap="+pageTimeStap,//添加账户  0 渠道 1 物流 2 车商
	        	editAcount:weburl+"/partnerManagement/sessionEditBankAccount.html?type=1&pageTimeStap="+pageTimeStap,//修改账户 0 渠道 1 物流 2 车商
	        	delAcount:weburl+"/partnerManagement/sessionDeleteBankAccount.html?type=1&pageTimeStap="+pageTimeStap,//删除缓存账号
	        	stopAcount:weburl+"/partnerManagement/sessionUpdateStatusBankAccount.html?type=1&pageTimeStap="+pageTimeStap,//修改状态
	        	lookAcount:weburl+"/partnerManagement/sessionGetBankAccount.html?type=1&pageTimeStap="+pageTimeStap,//查看账户
	        	upLoadImg:"http://192.168.199.113:8081/file",//上传图片路径
	      };


	      this.tpl={
	        acountListTpl:template.compile($("#acountListTpl").html()),//列表
	        preLookImgTpl:template.compile($("#preLookImgTpl").html()),//图片预览
	      };


	      this.init();//页面初始化准备工作
	      this.hasFlashPlugin();//判断是否安装Flash插件
	      this.initDateAndCity();//初始化日期和地区三级联动组件
	      this.initImgUpload();//初始化图片上传
	      this.addAcount();//添加账号
	      this.editAcount();//编辑账号
	      this.delAcount();//删除账户
	      this.stopAcount();//停用账号
	      this.lookAcount();//查看账号
	      this.validateAndSubmitForm();//验证提交页面数据
   	};

   	App.prototype={
   		init:function(){
	        var self=this;
	        laydate.skin("molv");
	      },
	      hasFlashPlugin:function(){

	        var explorer = window.navigator.userAgent ;

	        if (!!window.ActiveXObject || "ActiveXObject" in window) {
	          IE_Flash();
	        }else if (explorer.indexOf("Firefox") >= 0) {
	          FF_or_Chrome_Flash();
	        }else if(explorer.indexOf("Chrome") >= 0){
	          FF_or_Chrome_Flash();
	        }else if(explorer.indexOf("Opera") >= 0){
	          FF_or_Chrome_Flash();
	        }else if(explorer.indexOf("Safari") >= 0){
	          FF_or_Chrome_Flash();
	        }

	        function IE_Flash(){
	          try{
	            var swf=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
	          }catch(e){
	            flashTips();
	          }
	        }

	        function FF_or_Chrome_Flash(){
	          var swf = navigator.plugins["Shockwave Flash"];
	          if(!swf){
	            flashTips();
	          }
	        }

	        function flashTips(){
	          top.layer.msg('请先安装Flash插件');
	        }

	      },
	      loadList:function(data){
	      	var self=this;
	      	var $tbody=$("#acountListTbody");
	      	if(data.result){
           		var html=self.tpl.acountListTpl(data);
           		$tbody.html(html);
           	}
           	else{
           		parent.layer.msg(data.msg,{time:2000});
           	}

	      },
	      initDateAndCity:function(){
	      	var self=this;

	      	var start={
	          	elem:"#periodStart",
	          	format: 'YYYY-MM-DD',
	          	choose: function(datas){
	            	end.min = datas; //开始日选好后，重置结束日的最小日期
	            	end.start = datas //将结束日的初始值设定为开始日
	          	}
		      };

		      var end={
		         elem:"#periodEnd",
		         format: 'YYYY-MM-DD',
		      };

	        laydate(start);
	        laydate(end);

	      	laydate({
	      		elem:"#foundingDate",
	      		format: 'YYYY-MM-DD'
	      	});

	      	laydate({
	      		elem:"#verifyDate",
	      		format: 'YYYY-MM-DD'
	      	});

	      	var cityData = self.url.webUrl + "/statics/js/plugin/cxSelect/cityData.min.js";
		      require.async("cxSelect",function(){
		         $("#cityGroup").cxSelect({
		            url: cityData,               // 如果服务器不支持 .json 类型文件，请将文件改为 .js 文件
		            selects: ['province', 'city', 'area'],  // 数组，请注意顺序
		            emptyStyle: 'none'
		         });
		      });
	      },
	      initImgUpload:function(){
	      	var self=this;
	      	var imgLimit=30;
	      	function createConfig(type){// 0 营业执照 1 营业场所 2 合作协议 
	      		var uploadId="#Upload"+type;
	      		var preId="#PreWraper"+type;

	      		return {
		      		'swf':self.url.swf,
	   				'uploader':self.url.upLoadImg,
	   				'fileObjName': 'aaa',
		            'buttonText':'+',
		            'fileTypeDesc':'Image Files',
		            'fileTypeExts':'*.gif; *.jpg; *.png; *.jpeg',
		            'fileSizeLimit':'500KB',
		            'width':100,
		            'height':100,
	   				onSelectError: function(file,errorCode,errorMsg){
		               console.log(errorCode);
		               if(errorCode==-110){
		                  parent.layer.msg('上传的单张图片不能超过500K，请重新上传');
		                  return false;
		               }else if(errorCode==-120){
		                  parent.layer.msg('选择的图片是个空文件');
		                  return false;
		               }else if(errorCode==-130){
		                  parent.layer.msg('选择的文件类型跟设置的不匹配');
		                  return false;
		               }
		            },
		            onUploadSuccess:function(file,data, response) {
		            	if(typeof data=="string"){
		      				data=JSON.parse(data);
		      			}
		              	if(data.result){
		              		data.type=type;
   							var html=self.tpl.preLookImgTpl(data);
   							$(preId).append(html);

   							var leftPreLength=$(preId).find(".image-item").length;
   							if(leftPreLength>=imgLimit){
   								$(uploadId).addClass("hide");
   							}
		              	}
		            }
		      	};
		      }

      		require.async("uploadify",function(){
      			for(var i=0;i<3;i++){//0 营业执照 1 营业场所 2 合作协议 
      				var uploadId="#Upload"+i;
      				var preId="#PreWraper"+i;
      				$(uploadId).uploadify(createConfig(i));
      			}
	      	});
	      	$("body").on("click",".file-del",function(){//删除图片
	      		var $del=$(this);
	      		var type=$del.attr("data-type");
	      		var uploadId="#Upload"+type;
	      		var preId="#PreWraper"+type;

	      		$del.parent(".image-item").remove();
	      		$(uploadId).removeClass("hide");
	      	})
	      },
	      addAcount:function(){
	      	var self=this;
	      	$("#addCount").on("click",function(){
	      		parent.layer.open({
		            type: 2,
		            title: '添加账号',
		            shadeClose: false,
		            skin: 'ancai-layer-style',
		            shade: 0.4,
		            area: ['600px', '500px'],
		            content: self.url.addAcount
		         });
	      	})
	      },
	      editAcount:function(){
	      	var self=this;
	      	$("body").on("click",".operate-td .change",function(){
	      		var id=$(this).attr("data-id");
	      		parent.layer.open({
		            type: 2,
		            title: '修改账号',
		            shadeClose: false,
		            skin: 'ancai-layer-style',
		            shade: 0.4,
		            area: ['600px', '500px'],
		            content: self.url.editAcount+"&id="+id
		         });
	      	});
	      },
	      delAcount:function(){
	      	var self=this;
	      	$("body").on("click",".operate-td .del",function(){
	      		var id=$(this).attr("data-id");

	      		parent.layer.confirm('是否删除该账号?', 
		            {btn: ['确认','取消']}, //按钮
		            function(){
		              	$.ajax({
		                	url:self.url.delAcount+"&id="+id,
		                	type:"get",
		                	dataType:"json",
		                	success:function(data){
		                  	if(data.result){
		                    		self.loadList(data);
		                    		parent.layer.closeAll();
		                  	}
		                  	else{
		                  		parent.layer.msg(data.msg);
		                  	}
		                	}
		              	});
		            },
		            function(){
		              
		            }
		         );
	      	});
	      },
	      stopAcount:function(){
	      	var self=this;
	      	$("body").on("click",".operate-td .stop",function(){
	      		var id=$(this).attr("data-id");
	      		var status=$(this).attr("data-status")==0?1:0;

	      		parent.layer.confirm('是否停用该账号?', 
		            {btn: ['确认','取消']}, //按钮
		            function(){
		              	$.ajax({
		                	url:self.url.stopAcount+"&id="+id+"&status="+status,
		                	type:"get",
		                	dataType:"json",
		                	success:function(data){
		                  	if(data.result){
		                    		self.loadList(data);
		                    		parent.layer.closeAll();
		                  	}
		                  	else{
		                  		parent.layer.msg(data.msg);
		                  	}
		                	}
		              	});
		            },
		            function(){
		              
		            }
		         );
	      	});
	      },
	      lookAcount:function(){
	      	var self=this;
	      	$("body").on("click",".operate-td .look",function(){
	      		var id=$(this).attr("data-id");
	      		parent.layer.open({
		            type: 2,
		            title: '查看账号',
		            shadeClose: false,
		            skin: 'ancai-layer-style',
		            shade: 0.4,
		            area: ['600px', '450px'],
		            content: self.url.lookAcount+'&id='+id
		         });
	      	});
	      },
	      validateAndSubmitForm:function(){
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

			            self.validater=$("#pageForm").validate({
			              	errorClass:"error-label",
			              	// onkeyup:function(inp){//键盘抬起执行单个输入框验证
			               //  	self.validater.element(inp);
			              	// },
			              	rules:{
			                	companyName:{
			                  	required: true,
			                  	maxlength:60
			                	},
			                	contactsName:{
			                  	required: true,
			                  	minlength:2,
			                  	maxlength:16
			                	},
			                	contactsMobile:{
			                  	required: true,
			                  	isMobile:true
			                	},
			                	province:{
			                  	required: true
			                	},
			                	city:{
			                  	required: true
			                	},
			                	contactsAddr:{
			                		required: true,
			                		maxlength:60
			                	},
			                	licenceNumber:{
			                		required: true,
			                		pattern:/^\d{1,30}$/,
			                	},
			                	legalRep:{
			                		required: true
			                	},
			                	registeredCapital:{
			                		required: true
			                	},
			                	periodStart:{
			                		required: true,
			                		// dateNL:true
			                	},
			                	periodEnd:{
			                		required: true,
			                		// dateNL:true
			                	},
			                	foundingDate:{
			                		required: true,
			                		// dateNL:true
			                	},
			                	verifyDate:{
			                		required: true,
			                		// dateNL:true
			                	},
			                	registerStatus:{
			                		selectArea: true,
			                		// dateNL:true
			                	},
			                	legalRepIdcode:{
			                		required: true,
			                		isIdCardNo:true
			                	},
			                	scope:{
			                		required: true,
			                		maxlength:600
			                	},
			              	},
			              	messages:{
			                	companyName:{
			                  	required:"物流商名称不能为空",
			                  	maxlength:"物流商名称不能大于60个字符",
			                	},
			                	contactsName:{
			                  	required:"联系人不能为空",
			                  	minlength:"联系人为2-5个字符",
			                  	maxlength:"联系人为2-5个字符"
			                	},
			                	contactsMobile:{
			                		required:"联系人手机号不能为空",
			                		isMobile:"联系人手机号格式不正确"
			                	},
			                	province:{
			                		required:"联系地址不能为空",
			                	},
			                	city:{
			                		required:"联系地址不能为空",
			                	},
			                	contactsAddr:{
			                		required:"联系地址不能为空",
			                		maxlength:"联系地址不能超过60个字符"
			                	},
			                	licenceNumber:{
			                		required:"注册号不能为空",
			                		pattern:"注册号为30字符以内数字组合"
			                	},
			                	legalRep:{
			                		required:"法人代表不能为空",
			                	},
			                	registeredCapital:{
			                		required:"注册资本不能为空",
			                	},
			                	periodStart:{
			                		required:"营业期限起始日期不能为空",
			                		// dateNL:"营业期限起始日期格式不正确"
			                	},
			                	periodEnd:{
			                		required:"营业期限截止日期不能为空",
			                		// dateNL:"营业期限截止日期格式不正确"
			                	},
			                	foundingDate:{
			                		required:"成立时间不能为空",
			                		// dateNL:"成立时间格式不正确"
			                	},
			                	verifyDate:{
			                		required:"核准日期不能为空",
			                		// dateNL:"核准日期格式不正确"
			                	},
			                	registerStatus:{
			                		selectArea:"请选择登记状态"
			                	},
			                	legalRepIdcode:{
			                		required:"法人证件号不能为空",
			                		isIdCardNo:"请输入正确的身份证号码"
			                	},
			                	scope:{
			                		required:"经营范围不能为空",
			                		maxlength:"经营范围最多为600个字符"
			                	},
			              	},
			              	errorPlacement:function(error,elem){
			                  $("#formError").html(error);
			              	},
			              	success:function(element){
					            $("#formError").html('');
					        	},
			              	submitHandler: function(form){
			              		// 这里因为是form提交  需要后台验证是否上传了图片

			              		$(form).ajaxSubmit({
			              			type:"post",
					               dataType:'json',
					               success:function(data){
					               	if(data.result){
					               		location.href=$("#backLink").attr("href");
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
	      }
   	};

   	app=new App();
   });

 });
