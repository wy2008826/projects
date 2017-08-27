

exports.everyHalfHour={
	dayOfWeek:[1,2,3,4,5,0],
	hour:[9,10,11,13,14,15],
	// hour:[12],
	minute:[0,5,10,15,20,28,35,40,45,50,55]
}


exports.beforeAmClose={
	dayOfWeek:[1,2,3,4,5],
	hour:[11],
	minute:[25]
}

exports.beforePmClose={
	dayOfWeek:[1,2,3,4,5],
	hour:[14],
	minute:[50]
}


exports.excludeWeekends18={ // 除了周末之外每天晚上6:10
	dayOfWeek:[1,2,3,4,5,0],
	hour:[18],
	minute:[10]
}

exports.everyNight20={ // 除了周末之外每天晚上20:10
	dayOfWeek:[1,2,3,4,5],
	hour:[20],
	minute:[10]
}

exports.every5Minutes={ // 交易日每10分钟
    dayOfWeek:[1,2,3,4,5,0],
    hour:[9,10,11,13,14,15],
    minute:[10,20,30,40,50,59]
}
