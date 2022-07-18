function sumSalary(salaries) {
	let sum = 0
 
	if (salaries === null) {
	  return 0
	}
 
	for (let k in salaries) {
    if (isFinite(salaries[k])) {
      sum += salaries[k]
    }
  }

	return sum
}