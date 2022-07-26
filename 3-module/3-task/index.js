function camelize(str) {
  if (!str) {
    return str
  }

  return str
    .split('-')
    .map((part, index) => {
      if (index === 0) {
        return part
      }

      let firstLetter = part.slice(0, 1)
      let rest = part.slice(1)

      return `${firstLetter.toUpperCase()}${rest}`
    })
    .join('')
}
