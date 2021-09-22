
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
          activePageListener(shadow)
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

const activePageListener = (shadow) => {
    window.addEventListener("pageshow", () => {
        console.log(shadow)
        // get the page name
        const page = location.href.split("/").slice(-1).toString().replace(".html", "")
        console.log(page)
        // remove the active class from all page links
        let pageLinks = shadow.querySelectorAll('.page-link')
        for (let pageLink of pageLinks) {
            pageLink.classList.remove('active-page')
        }
        // make the current page active
        let pageLink = shadow.querySelector(`.${page}`)
        console.log(pageLink)
        if (pageLink) {
            pageLink.classList.toggle('active-page')
        } else {
            console.log("invalid page")
        }
    })
}