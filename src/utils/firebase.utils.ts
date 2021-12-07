import firebase from 'firebase/app'
import 'firebase/messaging'
import localforage from 'localforage'

const firebaseApp = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token')
  },
  //initializing firebase app
  init: function () {
    if (!firebase.apps.length) {
      return firebase.initializeApp({
        apiKey: 'AIzaSyDgEBVVldnHK8I2HWMO1vIv2kJc2L9fF9w',
        authDomain: 'kbdspace.firebaseapp.com',
        databaseURL: 'https://kbdspace.firebaseio.com',
        projectId: 'kbdspace',
        storageBucket: 'kbdspace.appspot.com',
        messagingSenderId: '579735491550',
        appId: '1:579735491550:web:25e20d979f76bc756fc34f',
        measurementId: 'G-F22536TJ3P',
      })
    }
  },
}

export const firebaseInstance = firebase

export default firebaseApp
