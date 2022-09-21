import React from 'react'
import EventForm from '../components/EventForm'
import HeaderBar from '../components/HeaderBar'

const CreateEvent = () => {
    return (<>
    <HeaderBar title='New events' btnTitle='Logout' btnRoute='logout'/>
    <EventForm title='Create an Event' btn='Create' />
    </>)
}

export default CreateEvent