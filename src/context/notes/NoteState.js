import React from "react";
import { useState } from "react";

import NoteContext from "./notecontext";

const host="http://localhost:5000/"

const NoteState=(props)=>{
    const initialnotes=[]
    const [notes,setNotes]=useState(initialnotes)

   const[currNote,setCurrNote]=useState({title:"",description:"",tag:"",update:false,id:""})

    //fetch all notes
    const getNotes=async ()=>{
      const response = await fetch("http://localhost:5000/notes/fetchallnotes", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
      }); 
      const data=await response.json()
      setNotes(data)
    }

    //ADD a note
        const addNote=async (title,description,tag)=>{
          const response=await fetch(`${host}notes/addnotes`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
          })
          const note=await response.json();
          setNotes(notes.concat(note))
          // const note={
           // "title": title,
           // "description": description,
           // "tag": tag,
           // "date": "1689494379002",
           // "__v": 0
          //};
          //setNotes(notes.concat(note)) 
        }
    //Delete a note
    const deleteNote=async(id)=>{
      const response=await fetch(`${host}notes/deletenotes/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
      })
      // let newNotes=notes.filter((note)=>{return note._id!==id})
      // setNotes(newNotes)
      getNotes()
    }
    //edit a note
    const editNote=async (id,title,description,tag)=>{
      //API call
      const response=await fetch(`${host}notes/updatenotes/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      })
      const json=response.json();
     /* for(let index=0;index<notes.length;index++){
        const element=notes[index];
        if(element._id===id){
          element.title=title;
          element.description=description;
          element.tag=tag;
        }
      }    */
      getNotes()
    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes,currNote,setCurrNote}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;