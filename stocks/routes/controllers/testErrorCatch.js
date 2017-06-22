let test=async function(){
	let success=await successTest();
	console.log(success);


	const fail=await failTest().catch(function(){
		console.log("12321")
	});
	console.log(fail)
}


function successTest(){
	return new Promise(function(resolve,reject){
		setTimeout(function(){
			resolve("success");
		},2000);
	});
}



function failTest(){
	return new Promise(function(resolve,reject){
		setTimeout(function(){
			reject("fail");
		},2000);
	});
}

test();