
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
				subHouseLists:[]//栋别 A栋
			};

			this.init();//页面初始化
			this.citySelect();//城市选择
			this.dateSelect();//日历选择
			this.addHouse();//添加楼盘
			this.addSubhouse();//添加子楼盘
			this.addElevator()//添加电梯
			this.addElevatorWall();//编辑每一个电梯的合作信息
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
								data.loupanName=$loupan.val();//楼盘
								console.log(data);

								$("#addForm").slideUp();
								$("#addWraper").slideDown();

							}
						});
					})

				})

			},
			addSubhouse:function(){//点击新增子楼盘
				var self=this;
				$("#addSubHouseBtn").on("click",function(){
					layer.open({
						title:"新增子楼",
						type: 2,
					  	area: ['400px', '300px'],
					  	fix: false, //不固定
					  	maxmin: true,
					  	content: 'addSubHouse.hbs'
					});
					
				})
			},
			createSubhouse:function(subName){//生成子楼盘模板
				var self=this;
				var data={
					houseName:subName,
					houseTimeStap:new Date()*1,
					elevatorLists:[]
				};
				self.elevatorData.subHouseLists.push(data);
				var html=self.tpl.subWraperTpl(data);
				$("#elevatorContainer").append(html);
			},
			addElevator:function(){
				var self=this;
				$("body").on("click",".addElevatorBtn",function(){
					var timestap=$(this).attr("data-house-timestap");
					var house=$(this).attr("data-house");
					layer.open({
						title:"为==>"+house+"  ==新增电梯",
					  type: 2,
					  area: ['600px', '300px'],
					  fix: false, //不固定
					  maxmin: true,
					  content: 'addElevator.hbs?houseTimeStap='+timestap
					});
				})
			},
			createElevator:function(data){
				var self=this;
				var html=self.tpl.elevatorItemTpl(data);
				console.log(data,html);
				$("#"+data.houseTimeStap).append(html);

				var elevatorName=data.elevatorName;
				var elevatorNum=data.elevatorNum;
				var elevatorData={//生成电梯信息
					elevatorTimeStap:data.elevatorTimeStap,
					elevatorName:data.elevatorName,
					wallLists:[]
				};
				for(var i=0;i<elevatorNum;i++){//生成电梯墙面数据
					var wallData={
						wallName:elevatorName+"——》"+i,
						index:i,
					};
					elevatorData.wallLists.push(wallData);
				}
				self.elevatorData.subHouseLists.forEach(function(item,index){
					if(item.houseTimeStap==data.houseTimeStap){
						self.elevatorData.subHouseLists[index].elevatorLists.push(elevatorData);
					}
				});
			},
			addElevatorWall:function(){
				var self=this;
				$("body").on("click",".elevator-wall-item",function(){//点击每一个电梯墙面，编辑电梯信息 包含电梯的合作公司信息{公司名字  联系方式 合作期限 广告类型}
					if($(this).hasClass("has-edit")){
						return ;
					}
					var houseTimeStap=$(this).attr("data-house-timestap");
					var elevatorTimeStap=$(this).attr("data-elevator-timestap");
					var index=$(this).attr("data-index");
					var text=$(this).text();
					layer.open({
						title:"编辑"+text,
					  type: 2,
					  area: ['600px', '300px'],
					  fix: false, //不固定
					  maxmin: true,
					  content: 'addElevatorWall.hbs?houseTimeStap='+houseTimeStap+"&elevatorTimeStap="+elevatorTimeStap+"&index="+index,
					});
				});
			},
			addElevatorWallData:function(data){//如何让每一个墙面对应电梯以及楼盘和子楼盘
				var self=this;
				var houseTimeStap=data.houseTimeStap;
				var elevatorTimeStap=data.elevatorTimeStap;
				var wallIndex=data.index;
				console.log(self.elevatorData,data);
				self.elevatorData.subHouseLists.forEach(function(house,index){
					if(house.houseTimeStap==houseTimeStap){

						house.elevatorLists.forEach(function(elevator,j){
							if(elevator.elevatorTimeStap==elevatorTimeStap){
								elevator.wallLists.forEach(function(wall,m){
									if(wall.index==data.index){
										wall=_.extend(wall,data);
										$("#"+houseTimeStap+"-"+elevatorTimeStap+"-"+wallIndex).addClass("has-edit");
									}
								});
							}
							return;

						});
					}
					return ;
				});
				console.log(data);

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

