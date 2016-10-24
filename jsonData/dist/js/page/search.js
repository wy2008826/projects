
define(function(require,module,exports){
	require("jquery");
	require("underscore");
	require("kkpager");
	require("kkpagerCss");

	$(function(){

		var App=function(){

			this.url={
				elevatorList:"searchElevator.html",
			};

			this.tpl={
				elevatorTpl:_.template($("#listTpl").html())
			};

			this.getQuery=function(){
				return {
					city:"杭州",
					area:"西湖区",
					house:"",
				};
			};

			this.init();
			this.loadList(this.getQuery());
			this.searchEvelator();
		};

		App.prototype={
			init:function(){

			},
			loadList:function(query){//根据不同的请求参数加载不同的查询列表
				
	        	var self=this;
	        	var $listTable=$("#listTable");
	        	var $listTbody=$("#listBody");
	        	var pageSize=5;

	        	var param={
	          	current:1,
	          	pageSize:pageSize,
	          	city:query["city"],
	          	house:query["house"],
	        	};
	        
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

