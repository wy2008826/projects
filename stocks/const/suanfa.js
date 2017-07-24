
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
    days:20,
    strategyName:'本地数据查找最近单阳不破的股票！！',
    baseDay:{
        formulas:[
            '(C-O)/O>0.04',
            '(C-O)/O<0.095',
        ]
    },
    laterDays:{
        formulas:[
            'every("(c-o)/o<=0.012",4)',
            'every("(o-O)/(C-O)>0.66",4)',
            'every("(c-O)/(C-O)>0.66",4)',
        ]
    }
};

exports.bouncePrice={
    days:10,
    strategyName:'本地数据查找最近涨幅居前的股票！！',
    baseDay:{
        formulas:[
            '(C-O)/O>0.07'
        ]
    }
};