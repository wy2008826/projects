
function add(router){
	router.get("/add.html",function*(next){
		console.log(this.path);
		var pageData={
			title:"哈哈"
		};
		yield this.render("add",pageData);//必须使用yield
		
	});
}

module.exports=add;