importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js')
importScripts('localforage.min.js')

firebase.initializeApp({
  apiKey: 'AIzaSyDFh7vqPeYpn910SH57WeofWnMXDc8WJGE',
  authDomain: 'fir-cloud-messaging-5543f.firebaseapp.com',
  databaseURL: 'https://fir-cloud-messaging-5543f.firebaseio.com',
  projectId: 'fir-cloud-messaging-5543f',
  storageBucket: 'fir-cloud-messaging-5543f.appspot.com',
  messagingSenderId: '354347614212',
  appId: '1:354347614212:web:7b474a30c18aa6d2b47551',
  measurementId: 'G-L63HMWWX6W',
})

const messaging = firebase.messaging()

messaging
  .getToken({ vapidKey: 'BFL037B39uHR7wezmhi2DZtTFNWbRnbfkYxlo7mO9Y9wB8mj-KEPrZFFThwglCaLXzsOdger7Cb46n1aC68rld8' })
  .then(async (currentToken) => {
    if (currentToken) {
    //   console.log('[firebase-messaging-sw.js] Token ', currentToken)
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.')
      // ...
    }
  })

// //background notifications will be received here
// messaging.setBackgroundMessageHandler(function (payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload)
//   // Customize notification here
//   const notificationTitle = 'Background Message Title'
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png',
//   }

//   return self.registration.showNotification(notificationTitle, notificationOptions)
// })

const processMessage = (message) => {
  if (!message.data) {
    return message
  }

  const { json: jsonString, type } = message.data

  if (!jsonString || !type) {
    return message
  }

  const json = JSON.parse(jsonString)

  if (type === 'postReply') {
    message.notification = {
      title: `${json.author.username} replied to your post`,
      body: json.content,
    }

    return message
  }

  if (type === 'commentReply') {
    message.notification = {
      title: `${json.author.username} replied to your comment`,
      body: json.content,
    }

    return message
  }

  if (type === 'approveKeyb') {
    message.notification = {
      title: `${json.author.username} approved your keyb`,
      body: json.content,
    }

    return message
  }

  if (type === 'approvePart') {
    message.notification = {
      title: `${json.author.username} approved your part`,
      body: json.content,
    }

    return message
  }





  return message
}

messaging.onBackgroundMessage(async (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)

  console.log('[firebase-messaging-sw.js] Global scope', this)

  const clients = await this.clients.matchAll()

  console.log('[firebase-messaging-sw.js] clients', clients)

  for (const client of clients) {
    client.postMessage('new message')
  }

  if (!payload.notification) {
    const message = processMessage(payload)

    console.log('[firebase-messaging-sw.js] Processed message', message)

    if (message.notification) {
      return self.registration.showNotification(message.notification.title, { body: message.notification.body })
    }
  }
})
