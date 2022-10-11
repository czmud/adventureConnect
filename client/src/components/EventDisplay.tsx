import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import EventModelForView from '../models/EventModelForView';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import User from '../models/User';
import Organizer from '../models/Organizer';
import axios from 'axios';
axios.defaults.withCredentials = true;


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        },
        }));
    
const StyledTableRow = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            },
            // hide last border
            '&:last-child td, &:last-child th': {
            border: 0,
            }
        }));
    
const dropDownStyle = {
    color: 'blue',
    textDecoration: 'underline'
}


interface EventDisplayProps{
    event: EventModelForView;
}

const EventDisplay = (props: EventDisplayProps) => {
    const [openOrg, setOpenOrg] = React.useState(false);
    const nav = useNavigate();
    const thisEvent = props.event;
    const [ currentOrganizer, setCurrentOrganizer ] = React.useState<Organizer>(new Organizer());
    
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL+'/api/organizers/current')
            .then(response => setCurrentOrganizer( new Organizer(
                response.data.organizer._id,
                response.data.organizer.firstName,
                response.data.organizer.lastName,
                response.data.organizer.email
            )))
            .catch(errors => console.log(errors));
    },[]);

    return (<>
    <Box sx={{ flexGrow: 1, margin: '0px 10%'}}>
        <Grid container spacing={2}>
            <Grid xs={12} md={12} lg={12}>
                <Item> <h1 style={{display: 'inline-list-item'}}>Event Organizer is: { thisEvent.organizer.firstName } {thisEvent.organizer.lastName}</h1>
                {!openOrg ? 
                <span style={ dropDownStyle } onClick={() => {
                    openOrg === false ? setOpenOrg(true) : setOpenOrg(false)
                }}>Want In?</span> :
                <span style={ dropDownStyle } onClick={() => {
                    openOrg === true ? setOpenOrg(false) : setOpenOrg(true)
                }}>Collapse</span>}</Item>
                <br/>
                {openOrg && <Item>Please contact the organizer: <a href={'mailto:'+thisEvent.organizer.email+'?subject='+thisEvent.organizer.firstName}><strong><em>{thisEvent.name}</em></strong></a></Item>}
            </Grid>
        <Grid container xs={12} md={12} lg={12} spacing={4}>
            <Grid xs={6} md={6} lg={6}>
                <Item>
                <Box
                id="category-a"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                >
                    <h2>What are we doing?</h2>
                </Box>
                <Box component="ul" aria-labelledby="category-a" sx={{ pl: 2 }}>
                    <p><em>{thisEvent.type}</em> ( Level: {thisEvent.intensity})</p>
                    {thisEvent.intensity === 0? <p>Just taking in the nature at no set pace</p> : thisEvent.intensity === 1 ? <p>Looking to get active in the outdoors</p>: thisEvent.intensity === 2 ? <p>Trying to actively enjoy the outside. </p> : thisEvent.intensity === 3 ? <p>We will be moving with purpose. </p> : thisEvent.intensity === 4 ? <p>Let break a sweat in nature!</p> : <p>Lets get Adventuring! 21+ (Parental Guidance Required)</p>}
                </Box>
                </Item>
            </Grid>
            <Grid xs={6} md={6} lg={6}>
                <Item>
                <Box
                id="category-b"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                >
                    <h2>When are we Going?</h2>
                </Box>
                <Box component="ul" aria-labelledby="category-b" sx={{ pl: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Date-Time Chosen"
                    value={thisEvent.date}
                    onChange={() => ''}
                    />
                </LocalizationProvider>
                </Box>
                </Item>
            </Grid>
            <Grid xs={6} md={6} lg={6}>
                <Item>
                <Box
                id="category-c"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                >
                    <h2>What is happening?</h2>
                </Box>
                <Box component="ul" aria-labelledby="category-c" sx={{ pl: 2 }}>
                    <p>Event Description: {thisEvent.description}</p>
                </Box>
                </Item>
            </Grid>
            <Grid xs={6} md={6} lg={6}>
                <Item>
                <Box
                id="category-d"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                >
                    <h2>Who is going?</h2>
                </Box>
                <Box component="ul" aria-labelledby="category-d" sx={{ pl: 2 }}>
                <Paper sx={{ width: '70%', margin: '0px 15%', overflow: 'scroll', postions: 'absolute'}}>
                <TableContainer sx={{ maxHeight: 160 }}>
                <Table size='small' stickyHeader sx={{ minWidth: 400 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Users Going: </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { thisEvent.users.length > 0 ? 
                    thisEvent.users.map((user: User, idx: number) => (
                        <StyledTableRow key={idx}>
                            <StyledTableCell component="th" scope="row">
                                {user.firstName} {user.lastName} ({user.email})
                            </StyledTableCell>
                        </StyledTableRow>
                    )): <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                No users yet
                            </StyledTableCell>
                        </StyledTableRow>}
                    </TableBody>
                </Table>
                </TableContainer>
                </Paper>
                </Box>
                </Item>
            </Grid>
            </Grid>
        <Grid xs={12} md={12} lg={12}
        container
        >
            { currentOrganizer.organizerId ?
            <Grid xs={6} md={6} lg={6}>
                <Item onClick={() => nav('/dashboard') }>Dashboard</Item>
            </Grid>
            :
            <Grid xs={6} md={6} lg={6}>
                <Item onClick={() => nav('/') }>Home</Item>
            </Grid>
            }
            { thisEvent.organizer.organizerId === currentOrganizer.organizerId ?
            <Grid xs={6} md={6} lg={6}>
                <Item onClick={() => nav('/event/update/'+thisEvent._id) }>Edit</Item>
            </Grid>
            : null }
            </Grid>
        </Grid>
    </Box>
    </>)
}

export default EventDisplay