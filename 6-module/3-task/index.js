import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides
    this.createCarousel()
    this.createCarouselInner()
    this.productAdd()
    this.slider()
  }

  createCarousel() {
    this.carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </dev>
    `)
  }

  createCarouselInner() {
    this.carouselInner = this.carousel.querySelector('.carousel__inner')

    this.slides.forEach(slide => {
      this.slide = slide
      this.carouselInner.insertAdjacentHTML('beforeend', `
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `)
    })
  }

  productAdd() {
    this.eventProductAdd = event => {
      if (event.target.closest('.carousel__button')) {
        let customEvent = new CustomEvent('product-add', {
          detail: this.slides[this.slideIndex].id,
          bubbles: true
        })

        this.carousel.dispatchEvent(customEvent)
      }
    }

    this.carousel.addEventListener('click', this.eventProductAdd)
  }

  slider() {
    const rightArrow = this.carousel.querySelector('.carousel__arrow_right')
    const leftArrow = this.carousel.querySelector('.carousel__arrow_left')
    let sumSlides = this.slides.length
    this.slideIndex = 0

    leftArrow.style.display = 'none'
    
    this.carousel.addEventListener('click', event => {
      let widthSlides = this.carousel.offsetWidth
      
      if (event.target.closest('.carousel__arrow_right') && this.slideIndex < sumSlides) {
        this.slideIndex += 1
        leftArrow.style.display = ''
        this.carouselInner.style.transform = `translateX(-${widthSlides * this.slideIndex}px)`
      } else if (event.target.closest('.carousel__arrow_left') && this.slideIndex > 0) {
        rightArrow.style.display = ''
        this.carouselInner.style.transform = `translateX(${widthSlides - widthSlides * this.slideIndex}px)`
        this.slideIndex -= 1
      }
      
      if (this.slideIndex === sumSlides - 1) {
        rightArrow.style.display = 'none'
      } else if (this.slideIndex < 1) {
        leftArrow.style.display = 'none'
      }
    })

  }

  get elem() {
    return this.carousel
  }
}
