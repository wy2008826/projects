

exports.everyHalfHour={
	dayOfWeek:[0,1,2,3,4],
	hour:[9,10,11,13,14],
	minute:[20,50]
}


exports.beforeAmClose={
	dayOfWeek:[0,1,2,3,4],
	hour:[11],
	minute:[25]
}

exports.beforePmClose={
	dayOfWeek:[0,1,2,3,4],
	hour:[14],
	minute:[50]
}


exports.excludeWeekends18={ // 除了周末之外每天晚上6:10
	dayOfWeek:[0,1,2,3,4],
	hour:[18],
	minute:[10]
}

exports.everyNight20={ // 除了周末之外每天晚上20:10
	dayOfWeek:[0,1,2,3,4],
	hour:[20],
	minute:[10]
}

exports.every5Minutes={ // 交易日每10分钟
    dayOfWeek:[0,1,2,3,4],
    hour:[9,10,11,13,14],
    minute:[0,10,20,30,35,40,50,60]
}
