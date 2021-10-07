
fetch("/components/image-slider.html")
.then(stream => stream.text())
.then(text => defineImageSlider(text))
const defineImageSlider = (html) => {
class ImageSlider extends HTMLElement {
  constructor() {
      super();
      let shadow = this.attachShadow({mode: 'open'});
      shadow.innerHTML = html;
      addCircles(shadow)
  }
}

window.customElements.define('image-slider', ImageSlider);
}

const addCircles = (shadow) => {
  let slot = shadow.querySelector('slot')
  let images = slot.getElementsByTagName('img')
  let container = shadow.querySelector('.container')
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