import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const auth = firebase.auth
export const db = firebase.firestore

export const login = () => {
  auth().signInWithRedirect(new auth.GoogleAuthProvider())
}

export const logout = () => {
  auth()
    .signOut()
    .then(() => {
      window.location.replace('/')
    })
}
