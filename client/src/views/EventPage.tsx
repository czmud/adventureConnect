import React, { useEffect } from 'react'
import HeaderBar from '../components/HeaderBar'
import EventDisplay from '../components/EventDisplay'
import EventModel from '../models/EventModel'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Organizer from '../models/Organizer'

const EventPage = () => {
    const { eventId } = useParams()
    // const [thisEvent, setThisEvent] = React.useState(EventModel)

    useEffect(() => {
        axios.get(''+eventId)
            .then(res => {
                // setThisEvent(res.data)
            })
            .catch(err => {

            })
    })
    return (<>
        <HeaderBar title='{event.name}' btnTitle='Dashboard' btnRoute='dashboard'/>
        <EventDisplay event={ new EventModel('name', 'desc', 'type', new Date(), 2, new Organizer('fName', 'lName', 'email'), []) }/>
    </>)
}

export default EventPage