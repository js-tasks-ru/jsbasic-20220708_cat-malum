function highlight(table) {
  const tbody = table.childNodes[3]
  const rows = tbody.children

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < 4; j++) {
      let rowsItem = rows[i].children

      if (rowsItem[j].dataset.available === 'true') {
        rows[i].classList.add('available')
      } else if (rowsItem[j].dataset.available === 'false') {
        rows[i].classList.add('unavailable')
      } else if (!rowsItem[3].getAttribute('data-available')) {
        rows[i].setAttribute('hidden', 'hidden')
      }

      if (+rowsItem[j].innerHTML < 18) {
        rows[i].style.textDecoration = 'line-through'
      }

      if (rowsItem[j].textContent === 'm') {
        rows[i].classList.add('male')
      } else if (rowsItem[j].textContent === 'f') {
        rows[i].classList.add('female')
      }     
    }
  }
}
