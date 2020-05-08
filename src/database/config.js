import firebase from 'firebase/app'

const firebaseDevConfig = {
  apiKey: 'AIzaSyBY2sZ2CbOsELW7_kXIwNXQTZfYwzbW1vE',
  authDomain: 'circuit-mittens-c47a4.firebaseapp.com',
  databaseURL: 'https://circuit-mittens-c47a4.firebaseio.com',
  projectId: 'circuit-mittens-c47a4',
  storageBucket: 'circuit-mittens-c47a4.appspot.com',
  messagingSenderId: '939213913100',
  appId: '1:939213913100:web:17f9c09b01f67e88afc229',
  measurementId: 'G-6GBYKNYB9B'
}

const firebaseProdConfig = {
  apiKey: 'AIzaSyB-V5fUURvKhIEiinQ8cmsVar0dP00USHI',
  authDomain: 'merry-stories.firebaseapp.com',
  databaseURL: 'https://merry-stories.firebaseio.com',
  projectId: 'merry-stories',
  storageBucket: 'merry-stories.appspot.com',
  messagingSenderId: '637521973556',
  appId: '1:637521973556:web:ba632dfab5cdd0cd9bd561',
  measurementId: 'G-VN720PLK1D'
}

firebase.initializeApp(
  process.env.NODE_ENV === 'production' ? firebaseProdConfig : firebaseDevConfig
)
