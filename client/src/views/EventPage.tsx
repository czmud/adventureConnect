import React from 'react'
import HeaderBar from '../components/HeaderBar'
import EventDisplay from './EventDisplay'

const EventPage = () => {
    return (<>
        <HeaderBar title='{event.name}' btnTitle='Dashboard' btnRoute='dashboard'/>
        <EventDisplay />
    </>)
}

export default EventPage