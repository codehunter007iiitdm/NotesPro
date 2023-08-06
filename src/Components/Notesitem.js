import React, { useContext } from 'react'
import noteContext from "../context/notes/notecontext"


const Notesitem = (props) => {
    const context=useContext(noteContext)
    const {deleteNote,setCurrNote}=context;
    const { note } = props;
    const handleClick=()=>{
        setCurrNote({title:note.title,description:note.description,tag:note.tag,update:true,id:note._id})
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-regular fa-pen-to-square mx-3" onClick={handleClick}></i>
                </div>
            </div>
        </div>
    )
}

export default Notesitem
