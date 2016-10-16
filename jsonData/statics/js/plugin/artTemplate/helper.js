define(function(require,exports,module){
    var template = require('artTemplate');

    //时间格式化
    template.helper('dateFormat', function (time, style) {
        function formatDate(now) {
            var year=now.getFullYear();
            var month=now.getMonth()+1;
            var date=now.getDate();
            var hour=now.getHours();
            var minute=now.getMinutes();
            var second=now.getSeconds();
            if(second < 10)
            {
                second = '0' + second;
            }
            if(minute < 10)
            {
                minute = '0' + minute;
            }
            if(style == 1 ){//格式:2014-08-15 00:00:00
                return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
            }else if(style == 2){//格式:2014-08-15 00:00
                return year+"-"+month+"-"+date+" "+hour+":"+minute;
            }else if(style == 3){//格式:2014/08/15
                return year+"/"+month+"/"+date;
            }else if(style == 4){//格式:2014-08-15
                return year+"-"+month+"-"+date;
            }
        }
        if(time==null ||time==''){
            return '';
        }
        var d = new Date(parseInt(time));
        return formatDate(d);
    });
    
    //红包状态
    template.helper('redPacketStatsFun', function (useStatus,nowTime,expiredtime) {
        if(useStatus == 0){//红包可用
        	var timeVal = expiredtime - nowTime;
        	if( timeVal > 1 ){
        		day = Math.floor((timeVal / 3600) / 24);
        		return '还有'+day+'天过期';
        	}
        }else if(useStatus == 1){
        	return "已使用";
        }else if(useStatus == 2){
        	return "已过期";
        }else if(useStatus == 3){
        	return "已转赠";
        }
    });
    
    //投资状态
    template.helper('inverstStatsFun', function (borrowStatus) {
        if(borrowStatus == 8){
        	return '<span class="text-center fs-18 state yihuankuan">已还款</span>';
        }else if(borrowStatus == 9){
        	return '<span class="text-center fs-18 state yihuankuan">已结清</span>';
        }else if(borrowStatus == 3 ||borrowStatus == 6 || borrowStatus == 7){
        	return '<span class="text-center fs-18 state daishou">待收中</span>';
        }else if(borrowStatus == 10){
        	return '<span class="text-center fs-18 state daishou">处理中</span>';
        }else if(borrowStatus == 11){
        	return '<span class="text-center fs-18 state yishixiao">已失败</span>';
        }else if(borrowStatus == 1){
        	return '<span class="text-center fs-18 state dongjie">冻结中</span>';
        }
    });
    
    template.helper('listStatsFun', function (borrowStatus) {
        if(borrowStatus == 8){
        	return '已经到期';
        }else if(borrowStatus == 9){
        	return '已经转让';
        }else if(borrowStatus == 3 ||borrowStatus == 6 || borrowStatus == 7){
        	return '预计到期';
        }else{
        	return '';
        }
    });
    
    //金额转换
	template.helper('moneyFormat', function (value) {	
        if(value >= 10000){
        	return value/10000+'万';
        }else{
        	return value;
        }
    });
    
    //金额格式化
    template.helper('moneyFixedFun', function (value) {
	    var f = parseFloat(value); 
	    if (isNaN(f)) { 
	    	return false; 
	    } 
	    var f = Math.round(value*100)/100; 
	    var s = f.toString(); 
	    var rs = s.indexOf('.'); 
	    if (rs < 0) { 
	    	rs = s.length; 
	        s += '.'; 
	    } 
	    while (s.length <= rs + 2) { 
	        s += '0'; 
	    } 
	    return s; 
    });
    

    //投资列表标题
    template.helper('borrrowListTitleFun', function (id,name,use) {
        if( use === 115 ){//新手
            return '<a href="financing-detail.html?id='+id+'" title="'+name+'"><span class="new"></span>'+name+'</a>';
        }else if( use === 999){
            return '<a href="financing-detail.html?id='+id+'" title="'+name+'"><span class="wbq"></span>'+name+'</a>';
        }else{
            return '<a href="financing-detail.html?id='+id+'" title="'+name+'">'+name+'</a>';
        }
    });
    //投资列表标题

    //判断标标签
    template.helper("taghelper",function(ismark){
        /*if(ismark=="按月付息"){        
            return 'tagbglabel';
        }else if(ismark=="可赎回"){        
            return 'tagbglabel';
        }else if(ismark=="定时"){        
            return 'tagbglabel';
        }else if(ismark=="定制"){        
            return 'tagbglabel';
        }else if(ismark=="定向"){        
            return 'tagbglabel';
        }else{        
            return '';
        }*/
        if(ismark!=null){        
            return 'tagbglabel';
        }
    });

    template.helper("rewardAprFun",function(reward_apr){
        if(reward_apr!=0){
            return '+'+reward_apr+'%';
        }
    });


    //S 项目期限
    template.helper("timeLimitFun",function(isday,time_limit_day,time_limit,is_mb){
      if(isday==1){//天标
        return time_limit_day+'天';
      }else{
        if(is_mb==1){//满标自动还款
            return '满标自动还款';
        }else{//月标
            return time_limit+'个月';
        }
      }
    });
    //E 项目期限


    template.helper("scalesFun",function(scales){
        scales = scales + "";
        var scales_array = scales.split(".");
        if (scales_array.length > 1) {
            return scales_array[0];
        }
        return scales;
    });

    template.helper("scalesMoney",function(account,account_yes){
        return (account*1-account_yes*1).toFixed(2);
    });

    //S 投资列表按钮显示
    template.helper("financingBtnFun",function(status,account,account_yes,is_flow,id,valid_date,valid_time,verify_time,sysDate){
      var time = verify_time*1000 + valid_time*1000*60*60*24 - sysDate*1000;
      var timer = valid_date-sysDate;
      if(time<=0){
        time = true
      }else{
        time = false;
      }
      var accountVal = parseFloat(account);
      var accountYesVal = parseFloat(account_yes);
      
      if( timer > 1 ){
          var countDown = setInterval(function(){
              if (timer > 1) {
                  timer -= 1;
                  var day = Math.floor((timer / 3600) / 24);
                  var hour = Math.floor((timer / 3600) % 24);
                  var minute = Math.floor((timer / 60) % 60);
                  var second = Math.floor(timer % 60);
                  var showDay = day;
                  var showHour = hour<10?"0"+hour:hour;//计算小时
                  var showMinute = minute<10?"0"+minute:minute;//计算分钟
                  var showSecond = second<10?"0"+second:second;//计算秒杀
                  if(showDay > 0){
                      $("#bid-"+id).html('<div class="repayment-btn"><a href="financing-detail.html?id='+id+'">'+showDay+"天&nbsp;"+showHour+'&nbsp;:&nbsp;'+showMinute+'&nbsp;:&nbsp;'+showSecond+'&nbsp;后开抢</a></div>');
                  }else{
                      $("#bid-"+id).html('<div class="repayment-btn"><a href="financing-detail.html?id='+id+'">'+showHour+'&nbsp;:&nbsp;'+showMinute+'&nbsp;:&nbsp;'+showSecond+'&nbsp;后开抢</a></div>');
                  }
                  
                } else { 
                    clearInterval(countDown);
                    window.location.reload();
                }
            }, 1000);
      }else{
          if(status == 1 && is_flow !=1 && time){
              return '<div class="dis-btn"><a href="financing-detail.html?id='+id+'" title="已过期">已过期</a></div>';
          }else if(status == 1 && (accountVal-accountYesVal) > 0 ){
              return '<div class="btn"><a href="financing-detail.html?id='+id+'" title="马上购买">马上购买</a></div>';
          }else if(status == 3 || (status == 6 || status==0 )|| (status == 1 && (accountVal == accountYesVal ) && is_flow == 0 )){
              return '<div class="dis-btn"><a href="financing-detail.html?id='+id+'" title="已售罄">已售罄</a></div>';
          }else if(status == 7){
             /* return '<div class="repayment-btn"><a href="financing-detail.html?id='+id+'" title="还款中">还款中</a></div>';*/
              return '<div class="dis-btn"><a href="financing-detail.html?id='+id+'" title="已售罄">已售罄</a></div>';
          }else if(status == 8){
              return '<div class="dis-btn"><a href="financing-detail.html?id='+id+'" title="已还款">已还款</a></div>';
          }else if(status == 0){
              return '<div class="dis-btn"><a href="financing-detail.html?id='+id+'" title="等待初审">等待初审</a></div>';
    //    }else if(status == 3){
    //        return '<div class="dis-btn"><a href="financing-detail.html?id='+id+'" title="复审通过">复审通过</a></div>';
          }else if(status == 2){
              return '<div class="dis-btn"><a href="financing-detail.html?id='+id+'" title="初审失败">初审失败</a></div>';
          }else if(status == 4){
              return '<div class="dis-btn"><a href="financing-detail.html?id='+id+'" title="复审失败">复审失败</a></div>';
          }else{
              return '<div class="dis-btn"><a href="financing-detail.html?id='+id+'" title="用户取消">用户取消</a></div>';
          }
      }
    });
    //E 投资列表按钮显示

    //S 转让列表按钮显示
    template.helper("transferBtnFun",function(status,id){
        if(status==3){
            return '<div class="dis-btn"><a href="transfer/showTransferingDetail.html?id='+id+'" title="已转让">已转让</a></div>';
        }else{
            return '<div class="btn"><a href="transfer/showTransferingDetail.html?id='+id+'" title="马上购买">马上购买</a></div>';
        }
    })
    //E 转让列表按钮显示


})