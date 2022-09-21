import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EventForm from '../components/EventForm'
import HeaderBar from '../components/HeaderBar'

const CreateEvent = (thisEvent: any) => {
    const nav = useNavigate();

    const onCreate = () => {
        axios.post('', thisEvent)
            .then(res => {

                nav('/dashboard');
            })
            .catch(err => {})
    }



    //!===============Just For Data Example========
    class Organizer{
        organizerFirstName: string;
        organizerLastName: string;
        organizerEmail: string;
        constructor(organizerFirstName: string, organizerLastName: string, organizerEmail: string){
        this.organizerFirstName= organizerFirstName;
        this.organizerLastName= organizerLastName;
        this.organizerEmail= organizerEmail;
        }
    }
    const organizer: Organizer = {
        organizerFirstName: 'Jesse',
        organizerLastName: 'Made',
        organizerEmail: 'This@Yea.gmail.com'
    }
    //! ========Delete after setting data routes up==========



    return (<>
    <HeaderBar title='New events' btnTitle='Logout' btnRoute='logout'/>
    <EventForm title='Create an Event' btn='Create' submitCallback={ onCreate } creator={ organizer } onSubmit={ onCreate }/>
    </>)
}

export default CreateEvent