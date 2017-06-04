
define(function(require,module,exports){
	require("jquery");
	require("underscore");
	require("kkpager");
	require("kkpagerCss");
	require("layDate");

	$(function(){

		var App=function(){

			this.url={
				elevatorList:"searchElevator.html",
			};

			this.tpl={
				elevatorTpl:_.template($("#listTpl").html())
			};

			this.getQuery=function(){
				var province=$("#province").val();
				var city=$("#city").val();
				var area=$("#area").val();
				var cooperStart=$("#cooperStart").val();
				var cooperEnd=$("#cooperEnd").val();

				var param={};
				
				setKeyVal(param,"province",province);//省份
				setKeyVal(param,"city",city);//城市
				setKeyVal(param,"area",area);//区域
				setKeyVal(param,"cooperStart",cooperStart);//合作开始日期
				setKeyVal(param,"cooperEnd",cooperEnd);//合作终止日期
				
				function setKeyVal(obj,key,val){
					if(val){
						obj[key]=val;
					}
				}
				return param;
			};

			this.init();
			this.citySelect();//城市选择
			this.dateSelect();//日历选择
			this.loadList(this.getQuery());
			this.searchEvelator();
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
			loadList:function(query){//根据不同的请求参数加载不同的查询列表
				console.log("load");
	        	var self=this;
	        	var $listTable=$("#listTable");
	        	var $listTbody=$("#listBody");
	        	var pageSize=5;

	        	var param=query;
	        	param.current=1;
	        	param.pageSize=pageSize;

	        	$.ajax({
	          	url:self.url.elevatorList,
	          	type:"get",
	          	data:param,
	          	dataType:"json",
	          	success:function(data){
	            	if(data.result){
	              		if(data.pages&&data.pages.total > 0){
			               var html=self.tpl.elevatorTpl(data);
			               console.log(html);
			               $listTbody.html(html);
			               $listTable.removeClass("hide");
			               kkpager.generPageHtml({
			                  pagerid: 'kkpager',
			                  pno : data.pages.currentPage,//当前页码
			                  total : data.pages.pages,//总页码
			                  totalRecords : data.pages.total,//总数据条数
			                  isShowFirstPageBtn  : false,
			                  isShowLastPageBtn : false,
			                  isShowTotalPage   : false,
			                  isShowTotalRecords  : false,
			                  isGoPage      : true,
			                  isShowCurrPage      : false,
			                  lang:{
			                      prePageText       : '<',
			                      nextPageText        :'>'
			                  },
			                  mode:'click',//click模式匹配getHref 和 click
			                  click:function(n,total,totalRecords){
			                    	param.current=n;
			                    	$.ajax({
			                        type:"get",
			                        url:self.url.elevatorList,
			                        data:param,
			                        dataType:"json",
			                        success:function(data){
			                          var html=self.tpl.elevatorTpl(data);
							               $listTbody.html(html);
			                        }
			                    	});
			                    	this.selectPage(n);
			                  },
			                  getHref : function(n){
			                     return 'javascript:;';
			                  }
			               })
		              	}else{
		                	$listTable.addClass("hide");
		                	$("#kkpager").html('<p style="line-height:200px;">'+data.msg+'</p>');
		              	}
		            }
		            else{
		              $listTable.addClass("hide");
		              $("#kkpager").html('<p style="line-height:200px;">'+data.msg+'</p>');
		            }
	          },
	          error:function(){
	            console.log("error");
	          }
	        });
	      },
			searchEvelator:function(){
				var self=this;
				$("#searchBtn").on("click",function(){
					self.loadList(self.getQuery());
				});
			}
		};

		app=new App();
	});
});

