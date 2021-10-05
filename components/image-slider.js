
fetch("/components/image-slider.html")
.then(stream => stream.text())
.then(text => defineImageSlider(text))
const defineImageSlider = (html) => {
class ImageSlider extends HTMLElement {
  constructor() {
      super();
      let shadow = this.attachShadow({mode: 'open'});
      shadow.innerHTML = html;
  }
}

window.customElements.define('image-slider', ImageSlider);
}