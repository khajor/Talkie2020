import React, {useState, useEffect} from 'react';
import './App.css'
import './media.css'
import NamePicker from './NamePicker.js';
import {db, useDB} from './db.js'
import {BrowserRouter, Route} from 'react-router-dom'
import Camera from 'react-snap-pic'
import {FiCamera} from 'react-icons/fi'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import Div100vh from 'react-div-100vh'

function App(){
  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])

  return <BrowserRouter>
    <Route path="/:room" component={Room}/>
  </BrowserRouter>
}

function Room(props) {
  const {room} = props.match.params
  const [name, setName] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const messages = useDB(room)

  // this function copied from github... 
  //async means you can use 'await', lets one line of code running befroe the next line runs 
  async function takePicture(img) {
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7) // generates random id for the img
    var storageRef = firebase.storage().ref() //making a reference in firebase storage
    var ref = storageRef.child(imgID + '.jpg') 
    await ref.putString(img, 'data_url') //this upoads the image 
    db.send({ img: imgID, name, ts: new Date(), room }) //now lets send a message that has an image!
  }
  // if showCamera is true, then render the camera div
  return <Div100vh>
    {showCamera && <Camera takePicture={takePicture} />}
    <header>
      <img className= "logo" 
        src="https://www.pngrepo.com/png/264733/170/chat-speech-bubble.png"
        alt="logo"
      />
      Talkie
      <NamePicker onSave ={setName}/>
    </header>

  <div className="messages">
    {messages.map((m,i)=> <Message key={i} m={m} name={name} />)}
  </div>

    <TextInput 
    onSend={(text)=>{
      db.send({
        text, name, ts: new Date(), room
      })
    }}
    showCamera={()=>setShowCamera(true)} // a new function that returns another function
    />
  </Div100vh>
}

const bucket = 'https://firebasestorage.googleapis.com/v0/b/talkie2020.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message({m, name}){ 
  return  <div className="message-wrap"
  from={m.name===name?'me':'you'}>
  <div className="message">
    <div className="message-name">{m.name} </div>
    <div className="message-text">
      {m.text} 
      {m.img && <img src={bucket + m.img + suffix} alt="pic"/>}
    </div>
  </div>
</div>
}

function TextInput(props){
  const [text, setText] = useState('')

  return <div className='text-input'>
    <button onClick={props.showCamera} className='input-button'> 
      <FiCamera className="camera-icon"/>
    </button>
  
    <form 
      onSubmit={(e)=> {
        e.preventDefault()
        if (text) props.onSend(text)
        setText('')
      }}
      className='form'>

      <input value={text} 
        placeholder="type message here"
        onChange={e=> setText(e.target.value)} 
        className="input-field"
      />

      <button className='input-button' disabled={!text}>
        <img className= "send-icon" src="https://static.thenounproject.com/png/383448-200.png" alt="send icon"/>
      </button>
    </form>
  </div>
}
export default App;
