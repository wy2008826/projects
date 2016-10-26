
define(function(require,module,exports){
	require("jquery");
	require("underscore");
	require("layDate");
	require("layer");
	require("layerCss");
	$(function(){

		var App=function(){

			this.url={
				addElevatorUrl:"addElevator.html",
			};

			this.tpl={
				subWraperTpl:_.template($("#subWraperTpl").html()),
				elevatorItemTpl:_.template($("#elevatorItemTpl").html()),
			};

			this.elevatorData={//新增 电梯信息
				subHouses:[]//栋别 A栋
			};

			this.init();//页面初始化
			this.citySelect();//城市选择
			this.dateSelect();//日历选择
			this.addHouse();//添加楼盘
			this.addSubhouse();//添加子楼盘
			this.addElevator()//添加电梯
			this.submitElevator();//提交数据
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
				var start={
				  	elem: '#cooperStart',
				  	format: 'YYYY-MM-DD',
	          	choose: function(datas){
	            	end.min = datas; //开始日选好后，重置结束日的最小日期
	            	end.start = datas //将结束日的初始值设定为开始日
	          	}
				};
				var end={
				  	elem: '#cooperEnd',
				  	format: 'YYYY-MM-DD',
	          	choose: function(datas){
	            	start.max = datas;
	          	}
				}

				laydate(start);
				laydate(end);

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

								var data=self.elevatorData;
								data.province=$province.val();//省份
								data.city=$city.val();//城市
								data.area=$area.val();//区域
								data.address=$address.val();//详细地址
								data.cooperStart=$cooperStart.val();//开始日期
								data.cooperEnd=$cooperEnd.val();//结束日期
								data.loupan=$loupan.val();//楼盘
								console.log(data);

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
					timestap:new Date()*1,
					elevators:[]
				};
				self.elevatorData.subHouses.push(data);
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
				var elevatorName=data.elevatorName;
				var elevatorNum=data.elevatorNum;
				var elevatorData={//生成电梯信息
					elevatorName:data.elevatorName,
					wallLists:[]
				};
				for(var i=0;i<elevatorNum;i++){//生成电梯墙面数据
					var wallData={
						wallName:elevatorName+"-->"+i,
					};
					elevatorData.wallLists.push(wallData);
				}
				self.elevatorData.subHouses.forEach(function(item,index){
					if(item.timestap==data.subHouseId){
						self.elevatorData.subHouses[index].elevators.push(elevatorData);
					}
				});
			},
			submitElevator:function(){
				var self=this;

				$("#submitElevatorBtn").on("click",function(){
					$.ajax({
						url:self.url.addElevatorUrl,
						type:"get",
						data:self.elevatorData,
						dataType:"json",
						success:function(data){
							console.log(data);
						}
					});
				});
			}
		};

		app=new App();
	});
});

