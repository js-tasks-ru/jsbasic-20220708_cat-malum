import createElement from '../../assets/lib/create-element.js'

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories
    this._createRibbonMenu()
    this._scrollingMenu()
    this._selectCategory()
  }

  _createRibbonMenu() {
    this.menu = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          <a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>
          <a href="#" class="ribbon__item" data-id="salads">Salads</a>
          <a href="#" class="ribbon__item" data-id="soups">Soups</a>
          <a href="#" class="ribbon__item" data-id="chicken-dishes">Chicken dishes</a>
          <a href="#" class="ribbon__item" data-id="beef-dishes">Beef dishes</a>
          <a href="#" class="ribbon__item" data-id="seafood-dishes">Seafood dishes</a>
          <a href="#" class="ribbon__item" data-id="vegetable-dishes">Vegetable dishes</a>
          <a href="#" class="ribbon__item" data-id="bits-and-bites">Bits and bites</a>
          <a href="#" class="ribbon__item" data-id="on-the-side ribbon__item_active">On the side</a>
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `)
  }

  _scrollingMenu() {
    this.ribbonInner = this.menu.querySelector('.ribbon__inner')
    this.arrowRight = this.menu.querySelector('.ribbon__arrow_right')
    this.arrowLeft = this.menu.querySelector('.ribbon__arrow_left')

    this.arrowLeft.classList.remove('ribbon__arrow_visible')

    this.menu.addEventListener('click', event => {
      if (event.target.closest('.ribbon__arrow_right') === this.arrowRight) {
        this.ribbonInner.scrollBy(350, 0)
      } else if (event.target.closest('.ribbon__arrow_left') === this.arrowLeft) {
        this.ribbonInner.scrollBy(-350, 0)
      }
    })
    
    this.ribbonInner.addEventListener("scroll", () => {
      this._changeVisibleArrow()
    })
  }

  _changeVisibleArrow() {
    let scrollWidth = this.ribbonInner.scrollWidth
    let clientWidth = this.ribbonInner.clientWidth
    this.scrollLeft = this.ribbonInner.scrollLeft
    this.scrollRight = scrollWidth - this.scrollLeft - clientWidth

    if (this.scrollLeft < 1) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible')
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible')
    }

    if (this.scrollRight < 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible')
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible')
    }
  }

  _selectCategory() {
    this.menu.addEventListener('click', (event) => {
      if (event.target === event.target.closest('.ribbon__item')) {
        event.preventDefault()

        this._styleCategory(event.target.dataset.id)

        this.customEvent = new CustomEvent('ribbon-select', {
          detail: event.target.dataset.id, 
          bubbles: true
        })

        this.menu.dispatchEvent(this.customEvent)
      }

      this.menu.addEventListener('click', this.customEvent)
    })
  }

  _styleCategory(target) {
    let categories = this.menu.querySelectorAll('a')

    for (let k of categories) {
      if (target === k.dataset.id) {
        k.classList.add('ribbon__item_active')
      } else {
        k.classList.remove('ribbon__item_active')
      }
    }
  }

  get elem() {
    return this.menu
  }
}
