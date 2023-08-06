
import React, { useContext, useEffect } from 'react'
import noteContext from "../context/notes/notecontext"
import NoteItem from './Notesitem'
import AddNote from './AddNote'
import {useNavigate} from 'react-router-dom'// use it to redirect the user to another page


const Notes = (props) => {
  const context=useContext(noteContext)
  const navigate=useNavigate();
  const {notes,getNotes}=context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate("/login")

    }
  },[])
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <div className="row my-3">
    <h2>Your Notes</h2>
    {notes.map((note,index)=>{
      return <NoteItem note={note} key={index}/>
    })}
    </div>
    </>
  )
}

export default Notes


