import debounce from './debounce.js';

export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.activeClass = 'active';
    this.dist = {
      finalPosition: 0,
      movePosition: 0,
      movement: 0,
      startX: 0,
    };
  }

  transition(active) {
    this.slide.style.transition = active ? 'transform .45s cubic-bezier(.22, 1, .36, 1)' : '';
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.15;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    this.isDragging = true;
    this.dist.startX = event.clientX;
    this.wrapper.setPointerCapture(event.pointerId);
    this.wrapper.classList.add('is-dragging');
    this.transition(false);
  }

  onMove(event) {
    if (!this.isDragging) return;
    event.preventDefault();
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (this.wrapper.hasPointerCapture(event.pointerId)) {
      this.wrapper.releasePointerCapture(event.pointerId);
    }
    this.wrapper.classList.remove('is-dragging');
    this.dist.finalPosition = this.dist.movePosition;
    this.transition(true);
    this.changeSlide(this.closestSlideIndex());
  }

  addSlideEvents() {
    this.wrapper.addEventListener('pointerdown', this.onStart);
    this.wrapper.addEventListener('pointermove', this.onMove);
    this.wrapper.addEventListener('pointerup', this.onEnd);
    this.wrapper.addEventListener('pointercancel', this.onEnd);
    this.wrapper.addEventListener('dragstart', (event) => event.preventDefault());
  }

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slideIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  closestSlideIndex() {
    return this.slideArray.reduce((closestIndex, slide, index) => {
      const closestDistance = Math.abs(this.dist.finalPosition - this.slideArray[closestIndex].position);
      const slideDistance = Math.abs(this.dist.finalPosition - slide.position);
      return slideDistance < closestDistance ? index : closestIndex;
    }, this.index.active);
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slideIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
    this.changeActiveClass();
  }

  changeActiveClass() {
    this.slideArray.forEach((item) => item.element.classList.remove(this.activeClass));
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  onResize() {
    setTimeout(() => {
      this.slidesConfig();
      this.changeSlide(this.index.active);
    }, 300);
  }

  addResizeEvent() {
    window.addEventListener('resize', this.onResize);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 200);
  }

  init() {
    if (!this.slide || !this.wrapper) return this;
    this.bindEvents();
    this.transition(true);
    this.addSlideEvents();
    this.slidesConfig();
    this.changeSlide(Math.floor(this.slideArray.length / 2));
    this.addResizeEvent();
    return this;
  }
}
