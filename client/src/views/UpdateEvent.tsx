import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import EventForm from '../components/forms/EventForm'
import HeaderBar from '../components/HeaderBar'
import EventModelForView from '../models/EventModelForView'
import Organizer from '../models/Organizer'

interface FormErrors{
    path: string;
    message: string;
}


const UpdateEvent = () => {
    const { id } = useParams();
    const [thisEvent, setThisEvent] = React.useState<EventModelForView>(new EventModelForView('','','','', new Date(), 1, new Organizer('fName', 'lName', 'email'), []));
    const [loaded, setLoaded] = React.useState(false);
    const [errors, setErrors] = React.useState<{ [path: string]: FormErrors }>({});
    const nav = useNavigate();

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL+'/api/events/'+id)
            .then(res => {setThisEvent( new EventModelForView(
                res.data.event._id,
                res.data.event.name,
                res.data.event.description,
                res.data.event.type,
                res.data.event.date,
                res.data.event.intensity,
                res.data.event.organizer,
                res.data.event.users
                ))
                setLoaded(true);
            })
            .catch(errors => console.log(errors))
        },[id])
        
        
//! ======== Needs Update Routes==============
    const onUpdate = (thisEvent: any) => {
        axios.put(''+id, thisEvent)
            .then(res => {

                nav('/dashboard');
            })
            .catch( errors => {
                const errorResponse = errors.response?.data.errors;
                if(errorResponse){
                    const errorDict: { [path: string]: FormErrors } = {};
                    for( const key of Object.keys(errorResponse)){
                        errorDict[errorResponse[key].path] = {
                            path: errorResponse[key].path,
                            message: errorResponse[key].message
                        };
                    }
                    setErrors(errorDict);
                } else {
                    console.error(errors)
                }
            })
    }

    return (<>
        <HeaderBar title='Edit Event' btnTitle='Logout' btnRoute='logout'/>
        { loaded && <EventForm title={thisEvent.type} btn='Update' submitCallback={ onUpdate } event={thisEvent} creator={thisEvent.organizer} formErrors={errors}/>}
    </>)
}

export default UpdateEvent