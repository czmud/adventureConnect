import React from 'react'
import EventForm from '../components/EventForm'
import HeaderBar from '../components/HeaderBar'

const UpdateEvent = () => {
    return (<>
        <HeaderBar title='Edit Event' btnTitle='Logout' btnRoute='logout'/>
        <EventForm title='Update {Event}' btn='Update'/>
    </>)
}

export default UpdateEvent