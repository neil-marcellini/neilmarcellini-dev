fetch("/components/site-nav.html")
    .then(stream => stream.text())
    .then(text => define(text));

function define(html) {
  class SiteNav extends HTMLElement {
      constructor() {
          super();
          var shadow = this.attachShadow({mode: 'open'});
          shadow.innerHTML = html;
      }
  }

  customElements.define('site-nav', SiteNav);
}