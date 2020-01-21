import React, {useState} from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([])
  console.log(messages)
  return <main>
    <header>
      <img className= "logo" 
        src="https://www.pngrepo.com/png/264733/170/chat-speech-bubble.png"
        alt="logo"
      />
      Talkie
      <div className= "whos-talking">
        Who's talking? <button className="edit-button"><img className="edit-icon" src="https://icons-for-free.com/iconfiles/png/512/edit+document+edit+file+edited+editing+icon-1320191040211803620.png" alt="edit icon"/></button>
      </div>
    </header>

<div className="messages">
  {messages.map((m, i)=>{
    return  <div key={i} className="message-wrap">
      <div className="message">{m}</div>
    </div>
  })}
</div>

    <TextInput onSend={(m)=>{
      setMessages([m, ...messages])
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

function WhosTalking(props){
  const [nameDisplay, setNameDisplay] = useState('whos-talking')
  
  return <div className= "whos-talking">
    {nameDisplay} 
    <button 
    // onClick= {} pass to other file to do this operation 
    className="edit-button">
      <img className="edit-icon" src="https://icons-for-free.com/iconfiles/png/512/edit+document+edit+file+edited+editing+icon-1320191040211803620.png" alt="edit icon"/>
    </button>
  </div>
}
export default App;
