import React, {useState} from 'react';
import './App.css';

function App() {

  return <main>
    <header>
      <img className= "logo" 
        src="https://www.pngrepo.com/png/264733/170/chat-speech-bubble.png"
        alt="logo"
      />
      Talkie
    </header>
    <TextInput/>
    <OnSend/>
  </main>
}

function TextInput(){
  const [text, setText] = useState('')

  return <div className='text-input'>
    <form 
      onSubmit={(e)=> {
        e.preventDefault()
        OnSend()
        setText('')
      }}
    className='form'>

      <input value={text} 
        placeholder=" type message here"
        onChange={e=> setText(e.target.value)} 
      />

      <button className='send-button'>
        <img className= "send-icon" src="https://static.thenounproject.com/png/383448-200.png" alt="send icon"/>
      </button>
    </form>
  </div>
}


function OnSend(){
  return <div className = 'sent-message'>

  </div>
}

export default App;
