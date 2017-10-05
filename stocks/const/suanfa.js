
exports.T={
    days:10,
    strategyName:'本地数据查找最近收T的股票！！',
    baseDay:{
        formulas:[
            '(H-L)/L>0.06',
            '(O-L)/(H-L)>0.65',
            '(C-L)/(H-L)>0.65'
        ]
    }
};

exports.SingleSunKeepDays={
    days:30,
    strategyName:'本地数据查找最近单阳不破的股票！！',
    baseDay:{
        formulas:[
            '(C-O)/O>0.055',
            '(C-O)/O<0.095',
        ]
    },
    laterDays:{
        formulas:[
            'every("(c-o)/o<=0.015",4)',
            // 'every("(c-o)/o>=-0.015",4)',
            'min("l",4)-O>(C-O)*0.6',
            'max("h",4)<C*1.015',
        ]
    }
};

exports.bouncePrice={
    days:10,
    strategyName:'本地数据查找最近涨幅居前的股票！！',
    baseDay:{
        formulas:[
            '(C-O)/O>=0.02'
        ]
    },
    passDays:{
        formulas:[
            'every("C>c*1.07",1)',
        ]
    },
};

exports.bounceVol={
    days:80,
    strategyName:'本地数据查找最近成交量暴涨的股票！！',
    baseDay:{
        formulas:[
            '(C-O)/O>0.05'
        ]
    },
    passDays:{
        formulas:[
            'max("vol",15)-VOL*0.2<0',//前5日最大成交量不高于vol*0.6
        ]
    },
};

exports.singleSunUpClosedAverage={
    days:40,
    strategyName:'本地数据查找最近单阳突破密集均线的股票！！',
    baseDay:{
        formulas:[
            '(C-O)/O>=0.045',
            // '(C-O)/O<=0.1',
            'H<=C*1.007',//不能有长上影线
            'C>_60',
            'O*1+(C-O)*0.3>Math.max(_5,_10,_20,_40)',
            'Math.max(_5,_10,_20,_40)<Math.min(_5,_10,_20,_40)*1.035',
            '_5>_10'
        ]
    },
    passDays:{
        formulas:[
            'every("(c-o)/o<0.03",5)',
            'every("(c-o)/o>-0.02",5)',
            // 'every("Math.max(_5,_10,_20,_40)<Math.min(_5,_10,_20,_40)*1.035",6)'
            // 'every("_5>_10",2)',//会限制掉很多很好的票
        ]
    }
}

//跳空上涨的股票
exports.jumpUpWithSpace={
    days:20,
    strategyName:'本地数据查找最近跳空上涨的股票！！',
    baseDay:{
        formulas:[
            '(C-L)/L>0.005',
            'C>O'
        ]
    },
    passDays:{
        formulas:[
            'L>max("h",2)*1.005',
        ]
    },
};

//回调至均线后开始回升的股票  有待完善
exports.huiTiaoToAverageAndBegainUp={
    days:120,
    strategyName:'回调至均线后开始回升的股票！！',
    baseDay:{
        formulas:[
            'C>O',
            '_5>_10',
            'C<_20*1.03 && C>_20',
            'H<L*1.02'
        ]
    },
    passDays:{
        formulas:[
            'max("(l-_20)/_20",15)>0.15',
            'count("_5<_10",3)>=2'
        ]
    },
};


exports.downAndUpRegular={
    days:120,
    strategyName:'本地数据查找反复震荡的股票！！',
    baseDay:{
        formulas:[
            '(C-O)/O<-0.04'
        ]
    },
    passDays:{
        formulas:[
            'every("(c-o)/o<0.005",3)',
            'every("(c-o)/o>-0.02",3)',
            'count("(c-o)/o>0.04",6)==1'
        ]
    },
    laterDays:{
        formulas:[
            'every("(c-o)/o>0.005",3)',
            'count("(c-o)/o>0.04",6)==1'
        ]
    }
}
