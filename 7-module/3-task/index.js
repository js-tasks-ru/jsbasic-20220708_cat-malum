import createElement from '../../assets/lib/create-element.js'

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._render()
    this._steps(steps, value)
    this._stepsListener(steps, value)
  }

  _render() { 
    this.slider = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress" style="width: 50%;"></div>
        <div class="slider__steps"></div>
      </div>
    `)
  }

  _steps(steps, value) {
    const sliderSteps = this.slider.querySelector('.slider__steps')

    for (let i = 0; i < steps; i++) {
      sliderSteps.innerHTML += '<span></span>'
    }

    let spans = sliderSteps.querySelectorAll('span')
    spans[value].classList.add('slider__step-active')
  }

  _stepsListener(steps) {
    this.slider.addEventListener('click', (event) => {
      let left = event.clientX - this.slider.getBoundingClientRect().left
      let leftRelative = left / this.slider.offsetWidth
      let segments = steps - 1
      let approximateValue = leftRelative * segments
      let value = Math.round(approximateValue)
      let valuePercents = value / segments * 100

      this.slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      }))
    })
  }

  get elem() {
    return this.slider
  }
}
