import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
    this.createCards();
    this.updateFilter(this.filters);
    // this.removeFilter();
  }

  render() { 
    this.card = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);
  }

  createCards() {
    this.productsGridInner = this.card.querySelector('.products-grid__inner');

    for (let k of this.products) {
      let card = new ProductCard(k);

      this.productsGridInner.appendChild(card.elem);
    };
  }

  reRenderCards(filterProducts) {
    let cards = this.card.querySelectorAll('.card');
    
    for (let k of cards) {
      k.remove();
    }

    for (let k of filterProducts) {
      let card = new ProductCard(k);

      this.productsGridInner.appendChild(card.elem);
    };
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters)

    console.log(this.filters)

    let vegeterian = this.products.filter(fil => {
      if (fil.vegeterian === this.filters.vegeterianOnly || this.filters.vegeterianOnly === false) {
        return true;
      };
    });
    let noNuts = this.products.filter(fil => {
      if (fil.nuts && this.filters.noNuts === true || this.filters.noNuts === false) {
        return true;
      };
    });
    let category = this.products.filter(fil => {
      if (fil.category === this.filters.category || this.filters.category === '') {
        return true;
      };
    });
    let maxSpiciness = this.products.filter(fil => {
      if (fil.spiciness <= this.filters.maxSpiciness || this.filters.maxSpiciness === false) {
        return true;
      };
    });

    console.log(vegeterian)
    console.log(noNuts)
    console.log(category)
    console.log(maxSpiciness)
//нужно попробовать отрисовку через цикл, сверить свойства this.filter и предыдущие фильтровки
    if (filters.hasOwnProperty('vegeterianOnly')) {
      this.reRenderCards(vegeterian);
    } else if (filters.hasOwnProperty('noNuts')) {
      this.reRenderCards(noNuts);
    } else if (filters.hasOwnProperty('category')) {
      this.reRenderCards(category);
    } else if (filters.hasOwnProperty('maxSpiciness')) {
      this.reRenderCards(maxSpiciness);
    };
  }

  get elem() {
    return this.card;
  }
}
