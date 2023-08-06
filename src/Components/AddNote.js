import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/notecontext"

const AddNote = (props) => {
    const context=useContext(noteContext)
    const {addNote,currNote,setCurrNote,editNote}=context;
   // const [note,setNote]=useState({title:"",description:"",tag:""});
    const handleClick=(e)=>{
      if(currNote.update){
        e.preventDefault();
        editNote(currNote.id,currNote.title,currNote.description,currNote.tag);
        setCurrNote({title:"",description:"",tag:"",update:false,id:""})
        props.showAlert("Updated successfully","success")
      }
    else{
      e.preventDefault();
      addNote(currNote.title,currNote.description,currNote.tag);
      setCurrNote({title:"",description:"",tag:"",update:false,id:""})
      props.showAlert("Added successfully","success")
      }
    }
    const onChange=(e)=>{
        setCurrNote({...currNote,[e.target.name]:e.target.value})
    }
  return (
    <div>
    <div className="container my-3">
    <h2>Add a Note</h2>
    <form className='my-3' onSubmit={handleClick}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">title</label>
        <input type="text" className="form-control" id="title" value={currNote.title} name="title" aria-describedby="emailHelp" onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" value={currNote.description} name="description" onChange={onChange}/>
      </div>
      <button type="submit" className="btn btn-primary">{currNote.update?"Update":"AddNote" }</button>
    </form>
  </div>
    </div>
  )
}

export default AddNote
