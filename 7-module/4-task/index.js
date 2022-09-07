import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;
    this.render();
    this.setValue(value);
    this.eventListener();
  }

  render() { 
    this.slider = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${'<span></span>'.repeat(this.steps)}
        </div>
      </div>
    `);
  }

  setValue(value) {
    this.value = value;

    let valuePercents = (value / this.segments) * 100;

    this.sub('thumb').style.left = `${valuePercents}%`;
    this.sub('progress').style.width = `${valuePercents}%`;

    this.sub('value').innerHTML = value;

    if (this.sub('step-active')) {
      this.sub('step-active').classList.remove('slider__step-active');
    }

    this.sub('steps').children[this.value].classList.add('slider__step-active');
  }

  eventListener() {
    this.sub('thumb').ondragstart = () => false;

    this.sub('thumb').onpointerdown = this.onPointerDown;

    this.slider.addEventListener('click', (event) => {
      let newLeft = (event.clientX - this.slider.getBoundingClientRect().left) / this.slider.offsetWidth;
      this.setValue(Math.round(newLeft * this.segments));

      this.slider.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        })
      );
    });
  }

  onPointerDown = event => {
    event.preventDefault();

    this.slider.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = event => {
    event.preventDefault();

    let newLeft = (event.clientX - this.slider.getBoundingClientRect().left) / this.slider.offsetWidth;

    if (newLeft < 0) {
      newLeft = 0;
    };
    
    if (newLeft > 1) {
      newLeft = 1;
    };

    this.sub('thumb').style.left = `${newLeft * 100}%`;
    this.sub('progress').style.width = `${newLeft * 100}%`;
    
    //Показ номера деления
    this.changeValue = Math.round(newLeft * this.segments);
    this.sub('value').textContent = this.changeValue;

    //Подсветка делений
    if (this.sub('step-active')) {
      this.sub('step-active').classList.remove('slider__step-active');
    }

    this.sub('steps').children[this.changeValue].classList.add('slider__step-active');
  }

  onPointerUp = () => {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    this.slider.classList.remove('slider_dragging');

    this.sub('thumb').style.left = `${(this.changeValue / this.segments) * 100}%`;
    this.sub('progress').style.width = `${(this.changeValue / this.segments) * 100}%`;
    
    this.slider.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.changeValue,
        bubbles: true
      })
    );
  }

  sub(ref) {
    return this.slider.querySelector(`.slider__${ref}`);
  }

  get elem() {
    return this.slider;
  }
}
