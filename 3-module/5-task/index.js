function getMinMax(str) {
	let result = {}
	let filter = str
		.split(' ')
		.filter(item => {
			if (isFinite(item)) return +item
		})
	
	result.min = Math.min.apply(null, filter)
	result.max = Math.max.apply(null, filter)
 
	return result
}