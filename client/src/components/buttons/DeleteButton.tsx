import axios from 'axios';
import React from 'react'


const DeleteButton = (props: any) => {
    const { eventId, buttonName, successCallback} = props;

//! ======== Needs Delete Routes==============
    const deleteEvent = (req: any, res: any) => {
        axios.delete(''+eventId)
            .then(res =>  { console.log(res); successCallback() })
            .catch(err => console.log("There was an error deleting Event", err))
    };

    return (
    <button onClick= {() => deleteEvent }>
        {buttonName}
    </button>
    )
}

export default DeleteButton;