
function add(router){
	router.get("/aaa.html",function*(next){
		console.log(this.path);
		var pageData={
			title:"哈哈"
		};
		
		this.body=pageData;
		
	});
}

module.exports=add;