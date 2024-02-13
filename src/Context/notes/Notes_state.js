import React, { useState } from "react";
import noteContext from "./Note_context";
const NotesState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setnotes] = useState(notesInitial);
  const getnotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViOTAxMTg2ZGMyOWRmZjdjNmY4Yjk0In0sImlhdCI6MTcwNjYyMzM5MH0.p0zRl6b2LOkRNvSPT6PzGRlkTMK7SfPV2Shv2Cfj_z4"
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      setnotes(json)
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };
  //add a note
  const addnote = async(title, description, tag) => {
    //api called here to add note 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViOTAxMTg2ZGMyOWRmZjdjNmY4Yjk0In0sImlhdCI6MTcwNjYyMzM5MH0.p0zRl6b2LOkRNvSPT6PzGRlkTMK7SfPV2Shv2Cfj_z4"
      },
      body:JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    // console.log("adding a new note");
    const newnote = json
    setnotes(notes.concat(newnote))
  }
  //edit a note
  const editnote = async (id, title, description, tag) => {
    try {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViOTAxMTg2ZGMyOWRmZjdjNmY4Yjk0In0sImlhdCI6MTcwNjYzNDU3M30.M69t8IXdcf2d2G_KvJNUV5AlvW79pybRChqfoeLuzks"
            },
            body: JSON.stringify({ title, description, tag })
        });

        if (!response.ok) {
            throw new Error(`Failed to update note: ${response.status}`);
        }

        const json = await response.json();

        // Logic to edit in client
        const updatedNotes = notes.map((note) =>
            note._id === id ? { ...note, title, description, tag } : note
        );

        setnotes(updatedNotes);
    } catch (error) {
        console.error("Error updating note:", error.message);
    }
};

  //delete note
  const deletenote = async(id) => {
    //API Calls
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViOTAxMTg2ZGMyOWRmZjdjNmY4Yjk0In0sImlhdCI6MTcwNjYyMzM5MH0.p0zRl6b2LOkRNvSPT6PzGRlkTMK7SfPV2Shv2Cfj_z4"
      },
      
    });
    const json = response.json();
    // console.log(json)
    // console.log("deleting the note with id" + id);
    const newNotes = notes.filter((notes) => { return notes._id !== id });
    setnotes(newNotes);
  }
  return (

    <noteContext.Provider value={{ notes, setnotes, addnote, editnote, deletenote ,getnotes}}>
      {props.children}
    </noteContext.Provider>

  )
}

export default NotesState;