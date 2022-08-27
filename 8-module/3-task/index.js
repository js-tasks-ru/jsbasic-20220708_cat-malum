export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let cartItem = {product: product, count: 0};

    if (product === null || product === undefined) {
      return;
    } else if (this.cartItems.length === 0) {
      this.cartItems.push(cartItem);
    }

    if (!this.cartItems.includes(this.cartItems.find(item => item.product.id === product.id))) {
      this.cartItems.push(cartItem);
    }

    for (let k of this.cartItems) {
      if (k.product.id === product.id) {
        k.count++;
      }
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    for (let k of this.cartItems) {
      if (k.product.id === productId) {
        if (amount === 1) {
          k.count++;
        } else if (amount === -1) {
          k.count--;
        }
      }
    }

    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].count === 0) {
        this.cartItems.splice(i, 1);
      }
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    for (let k of this.cartItems) {
      return false;
    }

    return true;
  }

  getTotalCount() {
    let result = 0;

    for (let k of this.cartItems) {
      result += k.count;
    }

    return result;
  }

  getTotalPrice() {
    let result = 0;

    for (let k of this.cartItems) {
      result += k.product.price * k.count;
    }

    return result;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

