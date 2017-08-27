const path=require('path');
const fs=require('fs');


module.exports=function(){
    let codes=fs.readFileSync(path.resolve(__dirname,'../../baseData/codes.json'),'utf-8');

    if(codes&&codes.length>0){
        return JSON.parse(codes)
    }else{
        return [];
    }
}