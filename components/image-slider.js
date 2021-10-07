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
      this.imageIndex = 0
      this.addCircles()
    }

    connectedCallback() {
      this.addButtonListeners()
    }

    addCircles() {
      let slot = this.shadow.querySelector('slot')
      let images = slot.getElementsByTagName('img')
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
    }

    addButtonListeners() {
      let slot = this.shadow.querySelector('slot')
      let slide = this.shadow.querySelector('.slide')
      slot.addEventListener('slotchange', (e) => {
        let images = slot.assignedElements()
        let firstImage = images[0]
        let width = firstImage.clientWidth
        let left = this.shadow.querySelector('button.button-left')
        left.addEventListener('click', () => {
          this.imageIndex--
          slide.style.transform = `translateX(${width * this.imageIndex}px)`
        })
        let right = this.shadow.querySelector('button.button-right')
        right.addEventListener('click', () => {
          this.imageIndex++
          slide.style.transform = `translateX(${-width * this.imageIndex}px)`
        })
      })
    }

}

window.customElements.define('image-slider', ImageSlider);
}