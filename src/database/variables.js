import { auth, db } from './functions'

export let isLoggedIn = false
export let isAdmin = false
export let isBanned = false
export let doesStoryExist = false
export let doesUserExist = false
auth().onAuthStateChanged(user => {
  if (user) {
    isLoggedIn = true
    db()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.data().isAdmin) {
          isAdmin = true
        } else {
          isAdmin = false
        }
      })
      .catch(err => {
        console.error(
          'An error occurred while determining if the user is an admin or not.'
        )
        console.error(err)
      })
    db()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.data().isBanned) {
          isBanned = true
        } else {
          isBanned = false
        }
      })
      .catch(err => {
        console.error('An error occurred while determining if the user is banned.')
        console.error(err)
      })
    db()
      .collection('stories')
      // Check URL to make sure it is not on the homepage
      // Otherwise, when on the homepage, firebase logs an error message to the console
      .doc(
        window.location.href.substring(window.location.href.lastIndexOf('/') + 1) !==
          ''
          ? window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
          : 'homepage'
      )
      .get()
      .then(doc => {
        if (!doc.exists) {
          doesStoryExist = false
        } else {
          doesStoryExist = true
        }
      })
      .catch(err => {
        console.error('An error occurred while determining if the story exists.')
        console.error(err)
      })
      db()
      .collection('users')
      // Check URL to make sure it is not on the homepage
      // Otherwise, when on the homepage, firebase logs an error message to the console
      .doc(
        window.location.href.substring(window.location.href.lastIndexOf('/') + 1) !==
          ''
          ? window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
          : 'homepage'
      )
      .get()
      .then(doc => {
        if (!doc.exists) {
          doesUserExist = false
        } else {
          doesUserExist = true
        }
      })
      .catch(err => {
        console.error('An error occurred while determining if the user exists.')
        console.error(err)
      })
  } else {
    isLoggedIn = false
    isAdmin = false
    isBanned = false
    doesStoryExist = false
    doesUserExist = false
  }
})
