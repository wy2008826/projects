// var x = process.hrtime();
// var i;
// for (i = 0; i < 10000000000; i++) {
// 	process.stdout._handle.setBlocking(true);
//     // console.log('abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc1234567890');
//     process.stdout.write('abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc1234567890\n');
// }
// console.log(process.hrtime(x),i);


// 该方法可行
// function g() {
//     process.stdout.write('abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc1234567890\n');
//     process.nextTick(g);
// }
// g();

var i=0;
var length=10000000000;

async function  start(){
	if(i<length){
		await sleep(0);
		i+=1;
		// start();
		process.nextTick(start);
		
	}
}

start();


async function  sleep(time){
	return new Promise(function(resolve,reject){
		// setTimeout(function(){
			console.log("abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc1234567890   "+i);
			resolve();
		// },time);
	});
}