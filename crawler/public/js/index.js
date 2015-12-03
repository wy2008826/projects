$(function(){
	var App=function(){

		this.tpl={
			avatarTpl:_.template($("#avatarImgTpl").html())
		};
		this.init();//页面初始化
		this.searchUrl();//抓取页面内容
	};

	App.prototype={
		init:function(){
			

		},
		searchUrl:function(){
			var self=this;
			$("#sendDataBtn").click(function(){
				var searchUrl=$("#target").val();
				$.ajax({
					url:"/index/getTargetPage",
					type:"POST",
					dataType:"json",
					data:{
						"url":searchUrl
					},
					success:function(data){
						console.log(data);
						if(data.code==1){
							var dataAll={
								"lists":data.avatarImg
							};
							var html=self.tpl.avatarTpl(dataAll);

							console.log(html,dataAll);
							$("#avatarWraper").html(html);
						}

					}

				});
			});
		}
	};

	var app=new App();
});