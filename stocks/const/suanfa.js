
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

exports.OneDownAndOneUp={//OneDownAndOneUp
    days:20,
    strategyName:'本地数据查找阳包阴的股票！！',
    baseDay:{
        formulas:[
            'C>O*1.028',
            'C<O*1.065',
            'L>O*0.092',
            'H<C*1.006'
        ]
    },
    passDays:{
        formulas:[
            'every("c<o",1)',
            'every("(o-c)/(C-O)<1.15 && (o-c)/(C-O)>0.85",1)',
        ]
    },
};

exports.SingleSunKeepDays={
    days:30,
    strategyName:'本地数据查找最近单阳不破的股票！！',
    baseDay:{
        formulas:[
            '(C-O)/O>0.035',
            '(C-O)/O<0.085',
        ]
    },
    laterDays:{
        formulas:[
            'every("Math.abs((c-o)/o)<=((C-O)/O)*0.25",4)',
            // 'every("(c-o)/o>=-0.015",4)',
            'min("o",4)-O>(C-O)*0.6',
            'max("c",4)<C*1.015',
            'max("h",4)<C*1.022',
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

//5日线开始突破10日线  有待完善
exports.huiTiaoToAverageAndBegainUp={//huiTiaoToAverageAndBegainUp
    days:120,
    strategyName:'5日线开始突破10日线！！',
    baseDay:{
        formulas:[
            'C>O',
            '_5>_10',
            'C>_30*0.097',
            'H<L*1.02',
            'O>_60'
        ]
    },
    passDays:{
        formulas:[
            // 'max("(l-_30)/_30",20)>0.15',
            'count("_5<_10",3)>=2',
            'every("(h-l)/l<0.02",3)',
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
