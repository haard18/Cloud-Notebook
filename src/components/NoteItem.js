import React, { useContext } from 'react'
import NotesContext from '../Context/notes/Note_context';

const NoteItem = (props) => {
    const { note,updatenote } = props;
    const context=useContext(NotesContext);
    const{deletenote}=context;
    return (
        <div className='col-md-3'>
            {/* {note.title}
            {note.description} */}
            <div className="card my-3"  >
               
                    <div className="card-body">
                      <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <div className="icons flex align-items-center">

                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id)}}></i>
                        <i className="fa-solid fa-pencil mx-2" onClick={()=>{updatenote(note)}}></i>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem
