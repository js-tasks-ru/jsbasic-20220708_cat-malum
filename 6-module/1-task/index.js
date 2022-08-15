/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows
    this.createTable()
    this.onclick()
  }

  createTable() {
    this.tabWrapper = document.createElement('DIV')
    const table = document.createElement('TABLE')
    const tHead = document.createElement('THEAD')
    const tBody = document.createElement('TBODY')
    this.tabWrapper.appendChild(table)
    table.appendChild(tHead)
    
    tHead.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
        </tr>
      </thead>
    `

    for (let k of this.rows) {
      tBody.innerHTML += `
        <tr>
          <td>${k.name}</td>
          <td>${k.age}</td>
          <td>${k.salary}</td>
          <td>${k.city}</td>
          <td><button class="deleteTR">X</button></td>
        </tr>
      `
    }

    table.appendChild(tBody)

    return this.tabWrapper
  }

  onclick() {
    this.tabWrapper.addEventListener('click', function(event) {
      if (event.target.tagName === "BUTTON") event.target.closest("TR").remove()
    })
  }

  get elem() {
    return this.tabWrapper
  }
}
