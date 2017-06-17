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
	dayOfWeek:[1,2,3,4,5],
	hour:[18],
	minute:[10]
}

exports.everyNight20={ // 除了周末之外每天晚上20:10
	dayOfWeek:[1,2,3,4,5],
	hour:[20],
	minute:[10]
}