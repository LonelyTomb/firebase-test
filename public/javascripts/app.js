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
  // Update Modal Process
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
        el('._id').value = data._id
        el('.name').value = data.name
        el('.dob').value = data.dob
        let gender = data.gender.toLowerCase()
        el(`#${gender}`).checked = true
        el('.phone').value = data.phone
        el('.email').value = data.email
        el('.department').value = data.department
        UIkit.modal('#modal-full').show()
      })
    })
  }
  // Update Record Process
  if (el('#save') !== null) {
    el('#save').addEventListener('click', () => {
      let _id = el('._id').value
      let name = el('.name').value
      let dob = el('.dob').value
      let gender
      if (el('#male').checked) {
        gender = 'Male'
      } else {
        gender = 'Female'
      }
      let phone = el('.phone').value
      let email = el('.email').value
      let department = el('.department').value

      fetch('edit/save', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          '_id': _id,
          'name': name,
          'dob': dob,
          'gender': gender,
          'phone': phone,
          'email': email,
          'department': department
        })
      }).then(res => {
        if (res.ok) return res.json
      }).then(data => {
        window.location.reload(true)
      })
    })
  }

  let remove = document.getElementsByClassName('delete')
  if (remove !== null) {
    // el('#delete').addEventListener('click', () => {
    //
    // })
    for (var i = 0; i < remove.length; i++) {
      UIkit.util.on(remove[i], 'click', function (e) {
        e.preventDefault()
        e.target.blur()
        console.log(e.target.parentNode.id)
        let name = e.target.parentNode.dataset.title
        UIkit.modal.confirm(`Do you wish to delete ${name}'s profile`).then(() => {
          fetch('edit/remove', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              _id: e.target.parentNode.id
            })
          }).then(res => {
            if (res.ok) return res.json()
          }).then(data => {
            console.log(data)
            window.location.reload(true)
          })
        }, function () {
          console.log('')
        })
      })
    }
  }
})()
