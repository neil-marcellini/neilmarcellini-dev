fetch("/components/image-slider.html")
  .then(stream => stream.text())
  .then(text => defineImageSlider(text))
const defineImageSlider = (html) => {
  class ImageSlider extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({
        mode: 'open'
      });
      this.shadow.innerHTML = html;
      this.imageIndex = 1
      this.addCircles()
    }

    connectedCallback() {
      this.addWrapImages()
      this.addButtonListeners()
      this.sliderWrap()
    }

    addWrapImages() {
      /*
      Add clones of the first and last images so that
      the slider can smoothly wrap around.
      */
      let imageSlider = document.querySelector('image-slider')
      let images = imageSlider.getElementsByTagName('img')
      let firstImage = images[0]
      let firstClone = firstImage.cloneNode()
      firstClone.id = 'firstClone'
      let lastImage = images[images.length - 1]
      let lastClone = lastImage.cloneNode()
      lastClone.id = 'lastClone'
      imageSlider.prepend(lastClone)
      imageSlider.appendChild(firstClone)
    }

    addCircles() {
      let slot = this.shadow.querySelector('slot')
      let images = slot.assignedElements()
      let container = this.shadow.querySelector('.container')
      // create circles container
      let circles = document.createElement('div')
      container.appendChild(circles)
      circles.className = 'circles'
      for (let image in images) {
        // create circle
        let circle = document.createElement('div')
        circle.className = 'circle'
        // add circle
        circles.appendChild(circle)
      }
      this.setActiveCircle()
    }

    addButtonListeners() {
      let slot = this.shadow.querySelector('slot')
      let slide = this.shadow.querySelector('.slide')
      let images = slot.assignedElements()
      let firstImage = images[0]
      let width = firstImage.clientWidth
      // move to the first image
      slide.style.transform = `translateX(${-width * this.imageIndex}px)`
      let left = this.shadow.querySelector('button.button-left')
      left.addEventListener('click', () => {
        this.imageIndex--
        slide.style.transition = 'transform 0.4s ease-in-out'
        slide.style.transform = `translateX(${-width * this.imageIndex}px)`
      })
      let right = this.shadow.querySelector('button.button-right')
      right.addEventListener('click', () => {
        this.imageIndex++
        slide.style.transition = 'transform 0.4s ease-in-out'
        slide.style.transform = `translateX(${-width * this.imageIndex}px)`
      })
    }

    setActiveCircle() {
      let activeIndex = this.imageIndex - 1
      let circles = this.shadow.querySelectorAll('.circle')
      for (let circleIndex = 0; circleIndex < circles.length; circleIndex++) {
        let circle = circles[circleIndex]
        if (circleIndex === activeIndex) {
          circle.classList.add('active-circle')
        } else {
          circle.classList.remove('active-circle')
        }
      }
    }

    sliderWrap() {
      let slide = this.shadow.querySelector('.slide')
      let imageSlider = document.querySelector('image-slider')
      let images = imageSlider.getElementsByTagName('img')
      let width = images[0].clientWidth
      slide.addEventListener('transitionend', () => {
        if (images[this.imageIndex].id === 'firstClone') {
          slide.style.transition = 'none'
          this.imageIndex = images.length - this.imageIndex;
          slide.style.transform = `translateX(${-width * this.imageIndex}px)`
        }
        if (images[this.imageIndex].id === 'lastClone') {
          slide.style.transition = 'none'
          this.imageIndex = images.length - 2;
          slide.style.transform = `translateX(${-width * this.imageIndex}px)`
        }
        this.setActiveCircle()
      })

    }

  }

  window.customElements.define('image-slider', ImageSlider);
}