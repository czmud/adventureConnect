import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../components/forms/EventForm';
import HeaderBar from '../components/HeaderBar';
import Organizer from '../models/Organizer';
import EventModel from '../models/EventModel';

import axios from 'axios';
axios.defaults.withCredentials = true;

interface FormErrors{
    path: string;
    message: string;
}

const CreateEvent = () => {
    const nav = useNavigate();
    const [ errors, setErrors ] = React.useState<FormErrors[]>([]);

//! ======== Needs Create Routes==============
    const onCreate = (thisEvent: EventModel) => {
        axios.post('http://localhost:8000/api/events/new', thisEvent)
            .then( () => nav('/dashboard'))
            .catch( errors => {
                const errorResponse = errors.response.data.errors;
                const errorList: FormErrors[] = [];
                for( const key of Object.keys(errorResponse)){
                    errorList.push({
                        path: errorResponse[key].path,
                        message: errorResponse[key].message
                    })
                }
                setErrors(errorList);
            })
    }



    //!===============Just For Data Example========
    const organizer: Organizer = {
        organizerId: "12345",
        firstName: 'Jesse',
        lastName: 'Made',
        email: 'This@Yea.gmail.com'
    }
    //! ======== Adjust based on creator data after setting data routes up==========



    return (<>
    <HeaderBar title='New events' btnTitle='Logout' btnRoute='logout'/>
    <EventForm title='Create an Event' btn='Create' submitCallback={ onCreate } creator={ organizer } formErrors={errors}/>

    </>)
}

export default CreateEvent