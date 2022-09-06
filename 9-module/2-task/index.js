import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  productsGrid;
  stepSlider;
  ribbonMenu;

  constructor() {
  }

  async render() {
    const carouselHolder = document.body.querySelector('[data-carousel-holder]');
    let carousel = new Carousel(slides);
    carouselHolder.appendChild(carousel.carousel);

    const ribbonMenuHolder = document.body.querySelector('[data-ribbon-holder]');
    this.ribbonMenu = new RibbonMenu(categories);
    ribbonMenuHolder.appendChild(this.ribbonMenu.menu);

    const stepSliderHolder = document.body.querySelector('[data-slider-holder]');
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    stepSliderHolder.appendChild(this.stepSlider.elem);

    const cartIconHolder = document.body.querySelector('[data-cart-icon-holder]');
    let cartIcon = new CartIcon();
    cartIconHolder.appendChild(cartIcon.elem);

    let cart = new Cart(cartIcon);

    let arrayProducts = await fetch('./products.json')
      .then(response => response.json());

    const productsGridHolder = document.body.querySelector('[data-products-grid-holder]')
    productsGridHolder.innerHTML = '';
    this.productsGrid = new ProductsGrid(arrayProducts);
    productsGridHolder.appendChild(this.productsGrid.elem);

    document.body.addEventListener('ribbon-select', event => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.body.addEventListener('slider-change', event => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    document.body.addEventListener('product-add', event => {
      this.productsGrid.products.forEach(item => {
        if (item.id === event.detail) {
          cart.addProduct(item);
        }
      });
    });

    document.body.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked
      });
    });
  }
}
