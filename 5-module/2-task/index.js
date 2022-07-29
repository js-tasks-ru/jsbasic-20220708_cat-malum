function toggleText() {
  const text = document.querySelector('#text')
  const button = document.querySelector('.toggle-text-button')

  button.addEventListener('click', () => {
	  if (!text.getAttribute('hidden')) text.setAttribute('hidden', true)
	  else if (text.getAttribute('hidden')) text.removeAttribute('hidden', false)
	})
}
