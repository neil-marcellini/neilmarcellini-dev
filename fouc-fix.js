/*
Once the page loads make the html visible.
This fixes Flash Of Un-styled Content caused by
web components loading in slightly later.
*/
window.addEventListener('load', () => {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
})