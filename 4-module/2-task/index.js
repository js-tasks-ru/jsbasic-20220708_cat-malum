function makeDiagonalRed(table) {
  const tr = table.rows
  
  for (let i = -1; i < 4; i++) {
    tr[i + 1].cells[i + 1].style.backgroundColor = 'red'
  }
}
