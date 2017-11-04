const UIkit = require('uikit')
const Icons = require('uikit/dist/js/uikit-icons.min')

UIkit.use(Icons)

function el (element) {
  return document.querySelector(element)
}

(() => {
  'use strict'
  let view = document.getElementsByClassName('view')
  for (let i = 0; i < view.length; i++) {
    view[i].addEventListener('click', () => {
      console.log(view[i])
      UIkit.modal('#modal-full').show()
    })
  }
})()
