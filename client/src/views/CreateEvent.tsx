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
    const [ currentOrganizer, setCurrentOrganizer ] = React.useState<Organizer>(new Organizer());

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



    React.useEffect(() => {
        axios.get('http://localhost:8000/api/organizers/current')
            .then(response => setCurrentOrganizer( new Organizer(
                response.data.organizer._id,
                response.data.organizer.firstName,
                response.data.organizer.lastName,
                response.data.organizer.email
            )))
            .catch(errors => console.log(errors));
    },[]);

    return (<>
    <HeaderBar title='New events' btnTitle='Logout' btnRoute='logout'/>
    <EventForm title='Create an Event' btn='Create' submitCallback={ onCreate } creator={ currentOrganizer } formErrors={errors}/>

    </>)
}

export default CreateEvent