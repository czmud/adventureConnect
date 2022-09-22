import React, {useState} from 'react'
import { TextField, Box, Input, MenuItem, Slider, Typography, Tooltip, SliderValueLabelProps, FormHelperText, Accordion, AccordionDetails, AccordionSummary, TableContainer, Table, TableRow, TableHead,TableCell, tableCellClasses, TableBody, styled, Paper, OutlinedInput, FormControl, Select, InputLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Event from '../classes/Event'
import Organizer from '../classes/Organizer'
import User from '../classes/User'

//===========All Styling Content======
const boxStyle = {
    background: 'rgba(200, 200, 200)',
    width: '60%',
    height: '900px',
    margin: '80px 20% 0px',
    borderRadius: '40px',
    padding: '15px'
}
const splitForm = {
    display: 'flex',
    justifyContent: 'space-around'
}
const formSide = {
    width: '90%',
    positions: 'relative'
}

const submitStyle ={
    background: 'gray',
    width: '100px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    margin: '20px 5px',
    postion: 'relative'
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

//========= Form Funtional ==============
function ValueLabelComponent(props: SliderValueLabelProps) {
    const { children, value } = props;

    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
        </Tooltip>
    );
    }

//========Form Sub-Components========
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


// ======= Actual Form component Starts Here =============
const types = ['Hiking', 'Back Packing', 'Climbing', 'Camping', 'Rafting', 'Boating', 'Extreme', 'Sports']


const EventForm = (props: any) => {
    const { title, btn, event, creator, submitCallback } = props;
    
    const organizer: Organizer = {
        organizerFirstName: creator.organizerFirstName,
        organizerLastName: creator.organizerLastName,
        organizerEmail: creator.organizerEmail
    }
    const thisEvent =  event || new Event('','','', new Date(), 1, organizer, []);

    const [eventName, setEventName] = useState(thisEvent.eventName);
    const onNameChange = (e: any) => {
        setEventName(e.target.value);
        console.log(eventName);
    }

    const [eventDescription, setEventDescription] = useState(thisEvent.eventDescription);
    const onDescriptionChange = (e: any) => {
        setEventDescription(e.target.value)
    }
    
    const [eventType, setEventType] = useState(thisEvent.eventType);
    const onTypeChange = (e: any) => {
        setEventType(e.target.value)
    }

    const [eventDate, setEventDate] = useState(thisEvent.eventDate);
    const onDateChange = (e: any) => {
        setEventDate(e.target.value)
    }

    const [eventIntensity, setEventIntensity] = useState(thisEvent.eventIntensity);
    const onIntensityChange = (e: any) => {
        setEventIntensity(e.target.value)
    }

    const [eventUsers, setEventUsers] = useState(thisEvent.eventUsers);
    const onNewUser = (e: any) => {
        setEventUsers([...eventUsers, e.target.value])
    }
    
    const submitHandler = () => {
        thisEvent.eventName = eventName;
        thisEvent.eventDescription = eventDescription;
        thisEvent.eventType = eventType;
        thisEvent.eventDate = eventDate;
        thisEvent.eventIntensity = eventIntensity;
        thisEvent.users = eventUsers;
        submitCallback(thisEvent);
    }



    return (
    <Box
    style={ boxStyle }
    component="form"
    sx={{
    '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    onSubmit={(e) => {e.preventDefault(); submitHandler() }}>
        <h1>{ title }</h1>
        <div style={ splitForm }>
            <div style={ formSide }>
                <TextField
                required
                fullWidth
                value={eventName}
                onChange = { onNameChange }
                id="outlined-name"
                label="Event Name"
                InputLabelProps={{
                    shrink: true
                }}
                helperText="Required: 2+ Characters!"
                />
                <br/><br/><br/>

                
                <TextField
                required
                fullWidth
                value={eventDescription}
                onChange={ onDescriptionChange }
                id="outlined-multiline-static"
                InputLabelProps={{
                    shrink: true
                }}
                label="Event Description"
                multiline
                rows={4}
                helperText="Required: 10+ Characters!"
                />
                <br/><br/><br/>

                <TextField
                required
                fullWidth
                value={ eventDate }
                onChange={ onDateChange }
                id="outlined-name"
                type="datetime-local"
                InputLabelProps={{
                    shrink: true
                }}
                label="Event Time"
                helperText="Required"
                />
                <br/><br/><br/>

                <FormControl sx={{ m: 1, width: 250, mt: 1 }}>
                    <InputLabel
                    variant="standard"
                    htmlFor="native-select">Select Event Type</InputLabel>
                    <Select
                    displayEmpty
                    value={ eventType }
                    onChange={ onTypeChange }
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        return selected
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                        <MenuItem disabled value="">
                        <em>Placeholder</em>
                        </MenuItem>
                    {types.map((name, idx) => (
                        <MenuItem
                        key={idx}
                        value={name}
                        >
                            {name}
                        </MenuItem>
                ))}
                    </Select>
                </FormControl>
                <br/><br/><br/>

            </div>
            <div style={ formSide }>
                <Box sx={{ m: 3 }}>
                    <Typography gutterBottom align="left">Intensity Rating</Typography>
                    <Slider
                    aria-label="Intensity Rating"
                    value={ eventIntensity }
                    onChange={ onIntensityChange }
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={5}
                    sx={{
                        width: 250
                    }}
                    components={{
                    ValueLabel: ValueLabelComponent,
                    }}/>
                    <FormHelperText id="my-helper-text">0 (ease) - 5 (intense)</FormHelperText>
                </Box>
                <br/><br/>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Event Organizer</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <TextField
                            required
                            id="outlined-name"
                            label="Organize Name"
                            value={""+thisEvent.eventOrganizer.organizerFirstName+ ' '+ thisEvent.eventOrganizer.organizerLastName}
                            InputProps={{
                                readOnly: true,
                            }}
                            /><br/>

                            <TextField
                            required
                            id="outlined-name"
                            label="Oraganizer Email"
                            type='email'
                            value={thisEvent.eventOrganizer.organizerEmail}
                            InputProps={{
                                readOnly: true,
                            }}
                            /><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <br/>
                <Accordion sx={{zIndex: '2'}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Add New Users</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        <Box
                            style={ boxStyle }
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={e => {e.preventDefault(); onNewUser(e)}}>
                            
                            <TextField
                            id="outlined-name"
                            label="First Name"
                            placeholder="User's First"
                            helperText="Required: 2+ Characters!"
                            />
                            <br/>

                            <TextField
                            id="outlined-name
                            "
                            label="Last Name"
                            helperText="Required: 2+ Characters!"
                            />
                            <br/>

                            <TextField
                            id="outlined-name"
                            label="Email"
                            type='email'
                            helperText="Required: Valid email"
                            />
                            <br/>

                            <Input style={ submitStyle } type='submit' value='Add New'/>
                        </Box>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <br/><br/><br/>
                
                <Paper sx={{ width: '70%', margin: '0px 15%', overflow: 'scroll', postions: 'absolute'}}>
                <TableContainer sx={{ maxHeight: 160 }}>
                <Table size='small' stickyHeader sx={{ minWidth: 400 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Users Going: </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { thisEvent.users ? 
                    thisEvent.users.map((user: User, idx: number) => (
                        <StyledTableRow key={idx}>
                            <StyledTableCell component="th" scope="row">
                                {user.userFirstName}{user.userLastName} ({user.userEmail})
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
            </div>
        </div>

    <Input style={ submitStyle } type='submit' value="Cancel"/>
    <Input style={ submitStyle } type='submit' value={ btn }/>
    
    </Box>
    )
}

export default EventForm