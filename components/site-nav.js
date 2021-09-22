fetch("/components/site-nav.html")
    .then(stream => stream.text())
    .then(text => define(text));

function define(html) {
    const template = document.createElement('template')
    template.innerHTML = html
  class SiteNav extends HTMLElement {
      constructor() {
          super();
          this.attachShadow({mode: 'open'});
          this.shadowRoot.appendChild(template.content.cloneNode(true))
      }
  }

  customElements.define('site-nav', SiteNav);
}