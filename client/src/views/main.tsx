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
const Main = () => {
    return (<div >

    <HeaderBar title='Upcoming Events' btnTitle='Login' btnRoute='login'/>

    <img alt='forrest' style={ imageStyle } src={ Background }></img>
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
export default Main;