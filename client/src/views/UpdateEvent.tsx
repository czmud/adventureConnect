import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import EventForm from '../components/forms/EventForm'
import HeaderBar from '../components/HeaderBar'
const EventModel =  require('../models/EventModel')




const UpdateEvent = () => {
    const { id } = useParams();
    const [thisEvent, setThisEvent] = useState(EventModel);
    const [loaded, setLoaded] = useState(true);
    const [errors, setErrors] = React.useState(Array<any>);
    const nav = useNavigate();


//! ======== Needs Update Routes==============
    useEffect(() => {
        axios.get(''+id)
            .then(res => {
                setThisEvent(res.data)
                setLoaded(true);
            })
            .catch(err=>{
                console.log(err);
                const errorResponse = err.response.data.error.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr)
            })}, [id]);


    const onUpdate = (thisEvent: any) => {
        axios.put(''+id, thisEvent)
            .then(res => {

                nav('/dashboard');
            })
            .catch(err=>{
                const errorResponse = err.response.data.error.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
            setErrors(errorArr);
            })
    }

    return (<>
        <HeaderBar title='Edit Event' btnTitle='Logout' btnRoute='logout'/>

        {errors.map((err, index) => <p key={index}>{err}</p>)}

        { loaded && <EventForm title={thisEvent.eventType} btn='Update' submitCallback={ onUpdate } event={thisEvent} creator={thisEvent.organizer}/>}
    </>)
}

export default UpdateEvent