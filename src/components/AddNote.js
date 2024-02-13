import React, { useState, useContext } from 'react';
import NotesContext from '../Context/notes/Note_context';

const AddNote = () => {
    const context = useContext(NotesContext);
    const { addnote } = context;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tag: ""
    });

    const handleclick = async (e) => {
        e.preventDefault();
        await addnote(formData.title, formData.description, formData.tag);
        // Clear the input fields after adding the note
        setFormData({
            title: "",
            description: "",
            tag: ""
        });
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" onChange={onChange} value={formData.title} id="title" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" autoComplete="current-password" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={formData.description} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" autoComplete="current-password" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={formData.tag} />
                    </div>
                 
                    <button disabled={formData.title.length<5||formData.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>
        </div>
    );
};

export default AddNote;
