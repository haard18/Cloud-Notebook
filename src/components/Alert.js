import React from 'react'

const Alert = (props) => {
    return (
        <div>
            <div className="alert alert-primary fade show alert-dismissible" role="alert">
               {props.message}
               <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

            </div>
        </div>
    )
}

export default Alert
