import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render()
  }

  render() {
    this.modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `)
  }

  open() {
    document.body.append(this.modal)
    document.body.classList.add('is-modal-open')

    this.modal.addEventListener('click', event => this._clickClose(event))
    this._listenerKeydown = event => this._escClose(event)
    document.addEventListener('keydown', this._listenerKeydown)
  }

  setTitle(title) {
    let modalTitle = this.modal.querySelector('.modal__title')
    modalTitle.innerHTML = ''
    modalTitle.textContent = title
  }

  setBody(body) {
    let modalBody = this.modal.querySelector('.modal__body')
    modalBody.innerHTML = ''
    modalBody.append(body)
  }

  close() {
    this.modal.remove()
    document.body.classList.remove('is-modal-open')
    document.removeEventListener('keydown', this._listenerKeydown)
  }

  _clickClose(event) {
    if (event.target.closest('.modal__close')) {
      this.close()
    }
  }

  _escClose(event) {
    if (event.code === 'Escape') {
      event.preventDefault()
      this.close()
    }
  }
}
