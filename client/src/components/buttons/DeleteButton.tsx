import axios from 'axios';
import React from 'react'

interface DeleteButtonProps{
    _id: string;
    entityType: string;
    buttonName: string;
    successCallback: Function;
}

const DeleteButton = (props: DeleteButtonProps) => {
    const { _id, entityType, buttonName, successCallback} = props;

//! ======== Needs Delete Routes==============
    const deleteEvent = () => {
        axios.delete('http://localhost:8000/api/'+entityType+'/delete/'+_id)
            .then( () => successCallback() )
            .catch(errors => console.log(errors));
    };

    return (
    <button type="button" onClick= { deleteEvent }>
        {buttonName}
    </button>
    )
}

export default DeleteButton;