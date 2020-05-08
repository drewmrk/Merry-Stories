import { auth, db } from './functions'

export let isLoggedIn = false
export let isAdmin = false
export let isBanned = false
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
  } else {
    isLoggedIn = false
    isAdmin = false
    isBanned = false
  }
})
