import React, {useState, useRef, useEffect} from 'react';
import {FiEdit} from 'react-icons/fi';
import {MdDone} from 'react-icons/md';

function NamePicker(props) {
    const [name, setName] = useState("") //changes the name variable itself??? Maybe...
    const [showName, setshowName] = useState(false) //changes if the name is showing or not
    const inputEl =  useRef(null) //No clue whats happening here

    //this saves a username that the user types in and makes it visible.
    // It also saves the name in the local storage 
    function saveName(){
        if (name && !showName) {
            props.onSave(name)
            setshowName(!showName)
            localStorage.setItem('name',name)
        }
        setshowName(!showName)
    }

    //if there is a username saved in local storage, this passes it to
    // setName (??) and saveName (saving the name)
    useEffect(()=>{
        const n = localStorage.getItem('name')
        if(n) {
            setName(n)
            saveName()
        }
    }, [])


    return <div className = 'whos-talking'>
        <input value={name} // does this mean that {name} is set to whatever is typed into the input field?
        style={{display: showName ? 'none' : 'flex'}} // if showname is true, display = none, else display = flex
        onChange= {e=> setName(e.target.value)} //this takes the input and sends into the setName function
        onKeyPress={e=> {
            if(e.key ==='Enter') props.onSave(name) //on enter keypress, send name into props.onSave
        }} 
        placeholder="Who's talking?"/> 

        {showName && <div className = 'username'>{name}</div>}  
        <button // ^ if show name is true, then render the div
            onClick= {saveName} 
            className="edit-button" /* vvv toggles the icon depending if theres a set username or not*/> 
            {showName ? <FiEdit/> : <MdDone/>} 
        </button>

    </div>
}

export default NamePicker
