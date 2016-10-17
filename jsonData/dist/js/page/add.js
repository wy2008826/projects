$(function(){
	var App=function(){

		this.init();
		this.postData();
	};

	App.prototype={
		init:function(){
			alert(111);
		},
		postData:function(){
			$.ajax({
				url:"aaa.html",
				type:"get",
				data:"124",
				dataType:"json",
				success:function(data){
					console.log(data);
				}
			});
		}
	};

	app=new App();
});