
fetch("/components/site-nav.html")
    .then(stream => stream.text())
    .then(text => define(text))
const define = (html) => {
  class SiteNav extends HTMLElement {
      constructor() {
          super();
          let shadow = this.attachShadow({mode: 'open'});
          shadow.innerHTML = html;
          addMenuListener(shadow)
      }
  }

  window.customElements.define('site-nav', SiteNav);
}

const addMenuListener = (shadow) => {
    const burger = shadow.querySelector('.hamburger-icon')
    const closeIcon = shadow.querySelector('.close-icon')
    const nav = shadow.querySelector('.nav-links')
    const slide = shadow.querySelector('.slide-bar')

    const toggleMenu = () => {
        nav.classList.toggle('nav-active')
        slide.classList.toggle('nav-active')
    }

    burger.addEventListener('click', toggleMenu)
    closeIcon.addEventListener('click', toggleMenu)

}