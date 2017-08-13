async function sleep(time=2000){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            resolve(true);
        },time);
    });
}

module.exports=sleep;