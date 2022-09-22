import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EventForm from '../components/forms/EventForm'
import HeaderBar from '../components/HeaderBar'

const UpdateEvent = () => {
    const nav = useNavigate();

    const onUpdate = () => {
        axios.put('', {_id: ''})
            .then(res => {

                nav('/dashboard');
            })
            .catch(err => {})
    }

    return (<>
        <HeaderBar title='Edit Event' btnTitle='Logout' btnRoute='logout'/>
        <EventForm title='Update {Event}' btn='Update' submitCallback={ onUpdate }/>
    </>)
}

export default UpdateEvent