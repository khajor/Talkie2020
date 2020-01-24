import React, {useState, useEffect} from 'react';
import './App.css';
import NamePicker from './NamePicker.js';
import {db, useDB} from './db.js'
import {BrowserRouter, Route} from 'react-router-dom'

function App(){
  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])

  return <BrowserRouter>
    <Route path="/:room" component={Room}/>
  </BrowserRouter>
}



function Room() {
  // const [messages, setMessages] = useState([])
  const [name, setName] = useState('')
  const messages = useDB()

  return <main>
    <header>
      <img className= "logo" 
        src="https://www.pngrepo.com/png/264733/170/chat-speech-bubble.png"
        alt="logo"
      />
      Talkie
      <NamePicker onSave ={setName}/>
    </header>

  <div className="messages">
    {messages.map((m, i)=>{
      return  <div key={i} className="message-wrap"
        from={m.name===name?'me':'you'}>
        <div className="message">
          <div className="message-name">{m.name} </div>
          <div className="message-text">{m.text} </div>
        </div>
      </div>
    })}
  </div>

    <TextInput onSend={(text)=>{
      db.send({
        text, name, ts: new Date(),
      })
    }} />
  </main>
}

function TextInput(props){
  const [text, setText] = useState('')

  return <div className='text-input'>
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

      <button className='send-button' disabled={!text}>
        <img className= "send-icon" src="https://static.thenounproject.com/png/383448-200.png" alt="send icon"/>
      </button>
    </form>
  </div>
}
export default App;
