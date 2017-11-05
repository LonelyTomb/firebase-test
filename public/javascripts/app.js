window.UIkit = require('uikit')
// const Icons = require('uikit/dist/js/uikit-icons')

// UIkit.use(Icons)

function el (element) {
  return document.querySelector(element)
}

(() => {
  'use strict'
  // Read Process
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
        el('.name').innerHTML = `<span>${data.name}</span>`
        el('.dob').innerHTML = data.dob
        el('.gender').innerHTML = data.gender
        el('.phone').innerHTML = data.phone
        el('.email').innerHTML = data.email
        UIkit.modal('#modal-full').show()
      })
    })
  }
  // Update Process
  let update = document.getElementsByClassName('update')
  for (let i = 0; i < update.length; i++) {
    update[i].addEventListener('click', () => {
      fetch('/edit/view', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          id: update[i].parentNode.id
        })
      }).then(res => {
        if (res.ok) return res.json()
      }).then(data => {
        el('.name').innerHTML = `<span>${data.name}</span>`
        el('.dob').value = data.dob
        el('.gender').value = data.gender
        el('.phone').value = data.phone
        el('.email').value = data.email
        UIkit.modal('#modal-full').show()
      })
    })
  }
})()
