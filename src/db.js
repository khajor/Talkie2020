import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

// const firebaseConfig = {
//     apiKey: "AIzaSyDe5hejNin_uspcktTCkhfQAhbWMIARuy0",
//     authDomain: "chatterrrrrrr.firebaseapp.com",
//     projectId: "chatterrrrrrr",
//     storageBucket: "chatterrrrrrr.appspot.com",
// }

const firebaseConfig = {
    apiKey: "AIzaSyB1NuBzP0lCXp8RF_6odUPsdSoRat4DyaE",
    authDomain: "talkie2020.firebaseapp.com",
    databaseURL: "https://talkie2020.firebaseio.com",
    projectId: "talkie2020",
    storageBucket: "talkie2020.appspot.com",
    messagingSenderId: "255077036795",
    appId: "1:255077036795:web:608b39e3b081c6cc0df65e",
    measurementId: "G-0ZVP68DVXJ"
  };

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()