import React from 'react'
import HeaderBar from '../components/HeaderBar'
import EventDisplay from '../components/EventDisplay'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Organizer from '../models/Organizer'
import EventModelForView from '../models/EventModelForView'

const EventPage = () => {
    const { id } = useParams()
    const [thisEvent, setThisEvent] = React.useState<EventModelForView>(new EventModelForView('','','','', new Date(), 1, new Organizer('fName', 'lName', 'email'), []))

    React.useEffect(() => {
        axios.get('http://localhost:8000/api/events/'+id)
            .then(res => setThisEvent( new EventModelForView(
                res.data.event._id,
                res.data.event.name,
                res.data.event.description,
                res.data.event.type,
                res.data.event.date,
                res.data.event.intensity,
                res.data.event.organizer,
                res.data.event.users
            )))
            .catch(errors => console.log(errors))
    },[id])
    return (<>
        <HeaderBar title={thisEvent.name} btnTitle='Dashboard' btnRoute='dashboard'/>
        <EventDisplay event={ thisEvent }/>
    </>)
}

export default EventPage