import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  _slider
  _sliderSteps
  _spans
  _changeValue
  customEvent

  constructor({ steps, value = 0 }) {
    this._render();
    this._createSteps(steps, value);
    this._stepsListener(steps)
    this._dragnDrop(steps);
  }

  _render() { 
    this._slider = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress" style="width: 50%;"></div>
        <div class="slider__steps"></div>
      </div>
    `);
  }

  _createSteps(steps, value) {
    this._sliderSteps = this._slider.querySelector('.slider__steps');

    for (let i = 0; i < steps; i++) {
      this._sliderSteps.innerHTML += '<span></span>';
    };

    this._spans = this._sliderSteps.querySelectorAll('span');
    this._spans[value].classList.add('slider__step-active');
  }

  _stepsListener(steps) {
    this._slider.addEventListener('click', (event) => {
      let left = event.clientX - this._slider.getBoundingClientRect().left
      let leftRelative = left / this._slider.offsetWidth
      let segments = steps - 1
      let approximateValue = leftRelative * segments
      let value = Math.round(approximateValue)
      let valuePercents = value / segments * 100

      this._slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      }))
    })
  }

  _dragnDrop(steps) {
    const slider = this._slider
    const thumb = this._slider.querySelector('.slider__thumb');
    const progress = this._slider.querySelector('.slider__progress');
    const sliderValue = this._slider.querySelector('.slider__value');
    let spans = this._spans;

    thumb.ondragstart = () => false;

    thumb.onpointerdown = function(event) {
      event.preventDefault();

      slider.classList.add('slider_dragging');

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);

      function onPointerMove(event) {
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        };
        
        if (leftRelative > 1) {
          leftRelative = 1;
        };
        
        let leftPercents = leftRelative * 100;
  
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        
        //Показ номера деления
        let segments = steps - 1;
        let approximateValue = leftRelative * segments;
        this._changeValue = Math.round(approximateValue);
  
        sliderValue.textContent = this._changeValue;

        //Подсветка делений
        for (let i = 0; i < steps; i++) {
          if (this._changeValue === i) {
            spans[i].classList.add('slider__step-active');
          } else {
            spans[i].classList.remove('slider__step-active');
          }
        }
      };
  
      function onPointerUp() {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);

        slider.classList.remove('slider_dragging');
        
        slider.dispatchEvent(new CustomEvent('slider-change', {
          detail: this._changeValue,
          bubbles: true
        }));
      };
    };
  }

  get elem() {
    return this._slider;
  }
}
