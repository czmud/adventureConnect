import * as React from 'react';
import HeaderBar from '../components/HeaderBar';
import { Link, useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';
import DeleteButton from '../components/buttons/DeleteButton';
import { LogoutButton } from '../components/buttons/LogoutButton';
import EventModelForView from '../models/EventModelForView';
import Organizer from '../models/Organizer';
axios.defaults.withCredentials = true;


const tableStyle = {
    width: '90%',
    margin: '10px 5%',
    border: '2px solid black',
    maxHeight: '500px',
    overflow: 'scroll'
}
const imageStyle ={
    height: '800px',
    margin: '0px',
    width: '100%',
    position: 'absolute' as 'absolute',
    left: '0',
    zIndex: '-1'
}
const addStyle={
    background: 'white',
    position: 'relative' as 'relative',
    top: '38px',
    right: '35%',
    zIndex: '3'
}


const Dashboard = () => {
    const nav = useNavigate();
    const [allEvents, setAllEvents] = React.useState<EventModelForView[]>([]);
    const [loaded, setLoaded] = React.useState(false);
    const [ currentOrganizer, setCurrentOrganizer ] = React.useState<Organizer>(new Organizer());

    React.useEffect(() => {
        axios.get('http://localhost:8000/api/events')
            .then(response => {
                setAllEvents(response.data.events);
                setLoaded(true);
            })
            .catch(errors => console.log(errors));
    },[]);

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

    const removeFromDom = (_id: string) => {
        setAllEvents(allEvents.filter( oneEvent => oneEvent._id !== _id));
    }

    return (<div >
    <HeaderBar title='Upcoming Events' btnTitle='Logout' btnRoute='logout'/>
    <img alt='forrest' style={ imageStyle } src='https://imgs.search.brave.com/T-P-O4YLS_ZosnHvHNyjhmxz0JJTX3Eznw_i7qzqJOw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93YWxs/dXAubmV0L3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE2LzAyLzE4/LzI4NDY2Mi1wbGFu/dHMtbmF0dXJlLXJp/dmVyLWZvcmVzdC5q/cGc'/>
    <Link  to='/event/new' style={ addStyle }> + New Event</Link>

    {loaded && <TableContainer style={ tableStyle } component={Paper}>

        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell><strong><h1>Event Name</h1></strong></TableCell>
            <TableCell align="right"><strong><h1>Type </h1></strong></TableCell>
            <TableCell align="right"><strong><h1>Intensity</h1></strong>
            </TableCell>
            <TableCell align="right"><strong><h1>Date</h1></strong></TableCell>
            <TableCell align="right"><strong><h1>Actions</h1></strong></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {allEvents.map((oneEvent) => (
            <TableRow
                key={oneEvent._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    <Link to={"/event/display/"+oneEvent._id}>
                        {oneEvent.name}
                    </Link>
                </TableCell>

                <TableCell align="right">{oneEvent.type}</TableCell>
                <TableCell align="right">{oneEvent.intensity}</TableCell>
                <TableCell align="right">{oneEvent.date.toString()}</TableCell>
                <TableCell align="right">
                    { oneEvent.organizer.organizerId === currentOrganizer.organizerId ?
                <>
                <button onClick= {() => nav('/event/update/'+oneEvent._id)}>Edit</button> 
                | 
                <DeleteButton _id={oneEvent._id} entityType="events" buttonName='Delete' successCallback={() => removeFromDom(oneEvent._id)}/>
                </>
                : null }
                </TableCell>

            </TableRow>
            
            ))}
        </TableBody>
        </Table>
    </TableContainer>}
    <LogoutButton></LogoutButton>
    </div>);
}
export default Dashboard;