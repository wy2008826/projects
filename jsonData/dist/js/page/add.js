
define(function(require,module,exports){
	require("jquery");
	require("underscore");
	require("layDate");
	require("layer");
	require("layerCss");
	$(function(){

		var App=function(){

			this.url={
				a:"a.html",
			};

			this.tpl={
				subWraperTpl:_.template($("#subWraperTpl").html()),
				elevatorItemTpl:_.template($("#elevatorItemTpl").html()),
			};


			this.init();//页面初始化
			this.citySelect();
			this.dateSelect();
			this.addHouse();//添加楼盘
			this.addSubhouse();//添加子楼盘
			this.addElevator()//添加电梯
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
			dateSelect:function(){
				var self=this;
				laydate({
				  	elem: '#cooperStart',
				});
				laydate({
				  	elem: '#cooperEnd',
				});

			},
			addHouse:function(){
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
								cooperStart:{
									required:true
								},
								cooperEnd:{
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
								cooperStart:{
									required:"合作期限不能为空"
								},
								cooperEnd:{
									required:"合作期限不能为空"
								},
								loupan:{
									required:"楼盘为必填项"
								}
							},
							errorPlacement:function(error,element){
								$("#formError").html(error);
							},
							submitHandler:function(form){
								
								var $province=$("#province");
								var $city=$("#city");
								var $area=$("#area");
								var $address=$("#address");
								var $cooperStart=$("#cooperStart");
								var $cooperEnd=$("#cooperEnd");
								var $loupan=$("#loupan");
								
								$("#mainName").text($loupan.val());
								$("#mainTime").text($cooperStart.val()+"——"+$cooperEnd.val());
								$("#mainArress").text($province.val()+$city.val()+$area.val());


								$("#addForm").slideUp();
								$("#addWraper").slideDown();

							}
						});
					})

				})

			},
			addSubhouse:function(){
				var self=this;
				$("#addSubHouseBtn").on("click",function(){
					layer.open({
					  type: 2,
					  area: ['400px', '300px'],
					  fix: false, //不固定
					  maxmin: true,
					  content: 'addSubHouse.hbs'
					});
					
				})
			},
			createSubhouse:function(subName){
				var self=this;
				var data={
					subName:subName,
					timestap:new Date()*1
				};
				var html=self.tpl.subWraperTpl(data);
				$("#elevatorContainer").append(html);
			},
			addElevator:function(){
				var self=this;
				$("body").on("click",".addElevatorBtn",function(){
					var id=$(this).attr("data-id");
					layer.open({
					  type: 2,
					  area: ['600px', '300px'],
					  fix: false, //不固定
					  maxmin: true,
					  content: 'addElevator.hbs?id='+id
					});
				})
			},
			createElevator:function(data){
				var self=this;
				var html=self.tpl.elevatorItemTpl(data);
				$("#"+data.subHouseId).append(html);
			}
		};

		app=new App();
	});
});

