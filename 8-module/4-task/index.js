import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = {product, count: 1};

    for (let item of this.cartItems) {
      if (item.product.id === product.id) {
        item.count++;
        this.onProductUpdate(item);

        return;
      }
    }

    this.cartItems.push(cartItem);
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id === productId) {
        item.count += amount;

        if (item.count === 0) {
          this.cartItems.splice(index, 1);
        }

        this.onProductUpdate(item);
      }
    });
  }

  isEmpty() {
    for (let k of this.cartItems) {
      return false;
    }

    return true;
  }

  getTotalCount() {
    let result = 0;

    for (let item of this.cartItems) {
      result += item.count;
    }

    return result;
  }

  getTotalPrice() {
    let result = 0;

    for (let item of this.cartItems) {
      result += item.product.price * item.count;
    }

    return result;
  }

  renderProduct(product, count) {
    return createElement(`
      <div class="cart-product" data-product-id="${product.id}">
        <div class="cart-product__img">
          <img src="/assets/images/products/${product.image}" alt="product">
        </div>
        <div class="cart-product__info">
          <div class="cart-product__title">${escapeHtml(product.name)}</div>
          <div class="cart-product__price-wrap">
            <div class="cart-counter">
              <button type="button" class="cart-counter__button cart-counter__button_minus">
                <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
              </button>
              <span class="cart-counter__count">${count}</span>
              <button type="button" class="cart-counter__button cart-counter__button_plus">
                <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
              </button>
            </div>
            <div class="cart-product__price">€${product.price.toFixed(2)}</div>
          </div>
        </div>
      </div>
    `);
  }

  renderOrderForm() {
    return createElement(`
      <form class="cart-form">
        <h5 class="cart-form__title">Delivery</h5>
        <div class="cart-form__group cart-form__group_row">
          <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
          <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
          <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
        </div>
        <div class="cart-form__group">
          <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
        </div>
        <div class="cart-buttons">
          <div class="cart-buttons__buttons btn-group">
            <div class="cart-buttons__info">
              <span class="cart-buttons__info-text">total</span>
              <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
            </div>
            <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
          </div>
        </div>
      </form>
    `);
  }

  renderModal() {
    let modalBodyContent = document.createElement('DIV');
  
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    for (let item of this.cartItems) {
      modalBodyContent.append(this.renderProduct(item.product, item.count));
    }

    modalBodyContent.append(this.renderOrderForm());

    this.modal.setBody(modalBodyContent);
    this.modal.open();

    if (document.body.classList.contains('is-modal-open')) {
      modalBodyContent.addEventListener('click', event => {
        if (event.target.closest('.cart-counter__button_minus')) {
          let cartId = event.target.closest('.cart-product').dataset.productId;

          this.updateProductCount(cartId, -1);
        }
        
        if (event.target.closest('.cart-counter__button_plus')) {
          let cartId = event.target.closest('.cart-product').dataset.productId;

          this.updateProductCount(cartId, 1);
        }
      });
    }

    let form = modalBodyContent.querySelector('.cart-form');
    form.addEventListener('submit', this.onSubmit.bind(this));
  }

  onProductUpdate(cartItem) {
    if (!this.cartItems.length) this.modal.close();

    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');
      let cartProduct = modalBody.querySelector(`[data-product-id="${productId}"]`);
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (!cartItem.count) cartProduct.remove();
    };

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();

    let button = this.modal.modal.querySelector('.cart-buttons__button');
    button.classList.add('is-loading');

    let form = this.modal.modal.querySelector('.cart-form');
    let formData = new FormData(form);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.status === 200) {
          this.modal.setTitle('Success!');
          this.cartItems = [];

          this.modal.setBody(createElement(`
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>
          `));

          this.cartIcon.update(this);
        }
      });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

