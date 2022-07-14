function factorial(n) {
  let a = 1

  while (n) {
    a *= n--
  }

  return a
}
