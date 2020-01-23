import React, {useState, useRef, useEffect} from 'react';
import {FiEdit} from 'react-icons/fi';
import {MdDone} from 'react-icons/md';

function NamePicker(props) {
    const [name, setName] = useState("")
    const [showName, setshowName] = useState(false)
    const inputEl =  useRef(null)

    function saveName(){
        if (name && !showName) {
            props.onSave(name)
            setshowName(!showName)
            localStorage.setItem('name',name)
        }
        setshowName(!showName)
    }

    
    useEffect(()=>{
        const n = localStorage.getItem('name')
        if(n) {
            setName(n)
            saveName()
        }
    }, [])

    return <div className = 'whos-talking'>
        <input value={name} 
        style={{display: showName ? 'none' : 'flex'}}
        onChange= {e=> setName(e.target.value)}
        onKeyPress={e=> {
            if(e.key ==='Enter') props.onSave(name)
        }}
        placeholder="Who's talking?"/>

        {showName && <div className = 'username'>{name}</div>}
        <button 
            onClick= {saveName}
            className="edit-button">
            {showName ? <FiEdit/> : <MdDone/>}
        </button>
    </div>
}

export default NamePicker
