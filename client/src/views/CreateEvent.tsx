import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EventForm from '../components/forms/EventForm'
import HeaderBar from '../components/HeaderBar'
import Organizer from '../models/Organizer'

const CreateEvent = () => {
    const nav = useNavigate();
    

//! ======== Needs Create Routes==============
    const onCreate = (thisEvent: any) => {
        axios.post('', thisEvent)
            .then(res => {

                nav('/dashboard');
            })
            .catch(err => { })
    }



    //!===============Just For Data Example========
    const organizer: Organizer = {
        organizerFirstName: 'Jesse',
        organizerLastName: 'Made',
        organizerEmail: 'This@Yea.gmail.com'
    }
    //! ======== Adjust based on creator data after setting data routes up==========



    return (<>
    <HeaderBar title='New events' btnTitle='Logout' btnRoute='logout'/>
    <EventForm title='Create an Event' btn='Create' submitCallback={ onCreate } creator={ organizer }/>

    </>)
}

export default CreateEvent