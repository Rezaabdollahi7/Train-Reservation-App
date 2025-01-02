// src/firebase-config.js
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDTgDxeRs0U-QR7Gj2rAS5m0leXQi9D0aU',
  authDomain: 'swiftrails-54e19.firebaseapp.com',
  projectId: 'swiftrails-54e19',
  storageBucket: 'swiftrails-54e19.appspot.com',
  messagingSenderId: '1023346310863',
  appId: '1:1023346310863:web:d485760b7eadfe49f8c1ba',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth, createUserWithEmailAndPassword }
