function makeFriendsList(friends) {
  const elem = document.createElement('ul')
  friends.map(item => elem.innerHTML += `<li>${item.firstName} ${item.lastName}</li>`)

  return elem
}
