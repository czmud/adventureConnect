import * as React from 'react';
import HeaderBar from './headerBar';
import { Link, useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    eventName: string,
    type: string,
    location: string,
    date: string,
) {
    return { eventName, type, location, date };
}

const rows = [
    createData('Weekend Hike', 'Hike', 'Mount Storm King', '10-22-2022'),
    createData("Codie's 20th BDay", 'Backpack', 'Colchuck Lake', '10-23-2022'),
    createData('Sinlge Mom Club', 'Hike', 'Cape Flattery', '10-26-2022'),
    createData('Rest and Relax', 'River Floating', 'Snoqualmie River', '10-27-2022'),
    createData('Bird Watching group', "Camping", 'Kalaloch Campground', '10-27-2022'),createData('Rest and Relax', 'River Floating', 'Snoqualmie River', '10-27-2022'),
    createData('Bird Watching group', "Camping", 'Kalaloch Campground', '10-27-2022'),createData('Rest and Relax', 'River Floating', 'Snoqualmie River', '10-27-2022'),
    createData('Bird Watching group', "Camping", 'Kalaloch Campground', '10-27-2022'),
];
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
    
    return (<div >
    <HeaderBar title='Upcoming Events'/>
    <img alt='forrest' style={ imageStyle } src='https://imgs.search.brave.com/T-P-O4YLS_ZosnHvHNyjhmxz0JJTX3Eznw_i7qzqJOw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93YWxs/dXAubmV0L3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE2LzAyLzE4/LzI4NDY2Mi1wbGFu/dHMtbmF0dXJlLXJp/dmVyLWZvcmVzdC5q/cGc'></img>
    <Link  to='/events/new' style={ addStyle }> + New Event</Link>
    <TableContainer style={ tableStyle } component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell><strong><h1>Event Name</h1></strong></TableCell>
            <TableCell align="right"><strong><h1>Type </h1></strong></TableCell>
            <TableCell align="right"><strong><h1>Location</h1></strong>
            </TableCell>
            <TableCell align="right"><strong><h1>Date</h1></strong></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow
                key={row.eventName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                {row.eventName}
                </TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
            </TableRow>
            
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    </div>);
}
export default Dashboard;