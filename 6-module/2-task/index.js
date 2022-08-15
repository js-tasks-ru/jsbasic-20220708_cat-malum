export default class ProductCard {
  #card
  #eventProductAdd

  constructor(product) {
    this.product = product
    this.createCard()
    this.productAdd()
  }

  createCard() {
    this.#card = createElement(`
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
          <span class="card__price">€${this.product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `)
  }

  productAdd() {
    this.#eventProductAdd = (event) => {
      if (event.target.closest('.card__button')) {
        console.log(this.product.id)
        let eventBubbles = new CustomEvent('product-add', {
          detail: this.product.id,
          bubbles: true
        })

        this.#card.dispatchEvent(eventBubbles)
      }
    }
    
    this.#card.addEventListener('click', this.#eventProductAdd)
  }

  get elem() {
    return this.#card
  }
}