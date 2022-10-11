import * as React from 'react';

import HeaderBar from '../components/HeaderBar';
import Background from '../images/giphy1.gif'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';
import EventModelForView from '../models/EventModelForView';
import { Link } from 'react-router-dom';

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
function dateChange(date: string){

    date = date.slice(0,19);
    
    const MM: Array<string> = ["January", "February","March","April","May","June","July","August","September","October","November", "December"]
    const year: string = date.slice(0, 4);
    const  month: string = date.slice(5, 7);
    const day: string = date.slice(8, 10);
    const hour: string = String(parseInt(date.slice(11,13)));
    const min: string = String(parseInt(date.slice(14, 17)));
    const a_p: string = parseInt(hour) < 12 ? 'AM' : 'PM'
    
    return ''+MM[parseInt(month)-1]+' '+day+', '+year+' '+hour+':'+min+' '+a_p;
    
    }
const Main = () => {
    const [allEvents, setAllEvents] = React.useState<EventModelForView[]>([]);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL+'/api/events')
            .then(response => {
                setAllEvents(response.data.events);
                setLoaded(true);
            })
            .catch(errors => console.log(errors));
    }, []);

    return (<div >

    <HeaderBar title='Upcoming Events' btnTitle='Login' btnRoute='login'/>
    <img alt='forrest' style={ imageStyle } src={ Background }></img>

    {loaded && <TableContainer style={ tableStyle } component={Paper}>
    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell><strong><h1>Event Name</h1></strong></TableCell>
            <TableCell align="right"><strong><h1>Type </h1></strong></TableCell>
            <TableCell align="right"><strong><h1>Intensity</h1></strong>
            </TableCell>
            <TableCell align="right"><strong><h1>Date</h1></strong></TableCell>
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
                <TableCell align="right">{dateChange(oneEvent.date.toString())}</TableCell>
            </TableRow>
            
            ))}
        </TableBody>
        </Table>
    </TableContainer>}
    </div>);
}
export default Main;