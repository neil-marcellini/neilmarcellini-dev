  console.log("setupDownloadButton")
  const downloadButton = document.querySelector('.download-box')
  const downloadLinks = document.querySelector('.download-links')
  let dropDownOpen = false
  document.addEventListener('click', (e) => {
    if(!dropDownOpen) {
      return
    }
    // detect click outside
    const downloadButton = document.querySelector('.download-box')
    let targetElement = e.target
    do {
      if(targetElement == downloadButton) {
        return
      }
      targetElement = targetElement.parentNode
    } while(targetElement)
    // clicked outside
    downloadButton.style.display = 'inline-block'
    downloadLinks.style.display = 'none'
    dropDownOpen = false
  })
  downloadButton.addEventListener('click', (e) => {
    if (!dropDownOpen) {
      e.target.style.display = 'flex'
      downloadLinks.style.display = 'flex'
      dropDownOpen = true
    } else {
      e.target.style.display = 'inline-block'
      downloadLinks.style.display = 'none'
      dropDownOpen = false
    }
  })