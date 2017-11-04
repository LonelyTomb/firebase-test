const UIkit = require('uikit')
// const Icons = require('uikit/dist/js/uikit-icons')

// UIkit.use(Icons)

function el (element) {
  return document.querySelector(element)
}

(() => {
  'use strict'
  let view = document.getElementsByClassName('view')
  for (let i = 0; i < view.length; i++) {
    view[i].addEventListener('click', () => {
      fetch('/users/view', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          id: view[i].id
        })
      }).then(res => {
        if (res.ok) return res.json()
      }).then(data => {
        console.log(data)
      })
      UIkit.modal('#modal-full').show()
    })
  }
})()
