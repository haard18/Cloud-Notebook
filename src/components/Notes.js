import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import NoteItem from './NoteItem';
import NotesContext from '../Context/notes/Note_context'
import AddNote from './AddNote';
const Notes = () => {
    const context = useContext(NotesContext);
    const { notes, getnotes ,editnote} = context;
    useEffect(() => {
        getnotes();
        // eslint-disable-next-line
    }, [])
    const [formData, setFormData] = useState({
        id:"",
        etitle: "",
        edescription: "",
        etag: ""
    });
    // const [currentNote, setCurrentNote] = useState(null);
    const [currentNote, setCurrentNote] = useState(null);

    const updatenote = (note) => {
        ref.current.click();
        setCurrentNote(note);
        setFormData({
            id:note._id,
            etitle: note.title || "",
            edescription: note.description || "",
            etag: note.tag || ""
        });
    }
    const handleclick = async (e) => {
        // console.log("Updating the note", currentNote);
        editnote(formData.id, formData.etitle, formData.edescription, formData.etag);
        refclose.current.click();
        // Clear the input fields after updating the note
        setFormData({
            id: "",
            etitle: "",
            edescription: "",
            etag: ""
        });
    };
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const ref = useRef(null)
    const refclose = useRef(null)
    return (
        <>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" minLength={5} className="form-control" name="etitle" onChange={onChange} value={formData.etitle} id="etitle" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" autoComplete="current-password" className="form-label">Description</label>
                                    <input type="text" minLength={5} className="form-control" id="edescription" name="edescription" onChange={onChange} value={formData.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" autoComplete="current-password" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={formData.etag} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={formData.etitle.length<5||formData.edescription.length<5} onClick={handleclick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <h2>Your Notes</h2>
                <div className="notes-container mx-3">
                {notes.length===0 &&"No note to display"}  

                </div>
                {notes.map((notes) => {
                    return <NoteItem key={notes._id} updatenote={updatenote} note={notes} />
                })}

            </div>
        </>
    )
}

export default Notes
