import React, {useState, useEffect} from 'react';
import './App.css';
import NamePicker from './NamePicker.js';
import {db} from './db.js'

function App() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')

  useEffect(()=>{
    db.listen({
      receive: m=> {
        setMessages(current=> [m, ...current])
      },
    })
  }, [])

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
      return  <div key={i} className="message-wrap">
        <div className="message">{m.text}</div>
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
