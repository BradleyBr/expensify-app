import * as firebase from 'firebase'


const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }

// child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

//child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = []

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         })
//         console.log(expenses)
//     })

// database.ref('expenses')
//     .on('value', (snapshot) => {
//         const expenses = []
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             })
//         })
//         console.log(expenses)
// })


// database.ref('expenses').push({
//     description: 'Big Food',
//     note: '',
//     amount: 200,
//     createdAt: 'jan 6' 
// })




// database.ref('notes/-LRdXYwhSss1A2p8TgCW').remove()
// database.ref('notes').push({
//     title: 'Course Topics',
//     body: 'React Native, Angular, Python'
// })

// const onValueChange = database.ref().on('value', (snapshot) => {
//     const newPerson = snapshot.val()
//     console.log(`${newPerson.name} is a ${newPerson.job.title} at ${newPerson.job.company}`)
// }, (e) => {
//     console.log('Error with data fetching', e)
// })

// database.ref('location')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val()
//         console.log(val)
//     })
//     .catch((error) => {
//         console.log('Error fetching data', error)
// })
// database.ref().set({
//     name: 'Brad Brooks',
//     age: 31,
//     stressLevel: 6,
//     job: {
//         title: 'Software Developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'White Rock',
//         country: 'Canada'
//     }
// }).then(() => {
//     console.log('Data is saved!')
// }).catch((error) => {
//     console.log('This failed.', error)
// })

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// })

// database.ref('isSingle').remove().then(() => {
//     console.log('remove was successful')
// }).catch((error) => {
//     console.log('this failed.', error)
// })