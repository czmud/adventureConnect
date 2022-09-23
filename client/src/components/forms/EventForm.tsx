import React, { ReactNode, SyntheticEvent, useState} from 'react'
import { TextField, Box, Input, MenuItem, Slider, Typography, Tooltip, SliderValueLabelProps, FormHelperText, Accordion, AccordionDetails, AccordionSummary, TableContainer, Table, TableRow, TableHead,TableCell, tableCellClasses, TableBody, styled, Paper, OutlinedInput, FormControl, Select, InputLabel, SelectChangeEvent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventModel from '../../models/EventModel'
import Organizer from '../../models/Organizer'
import User from '../../models/User'

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

interface FormErrors{
    path: string;
    message: string;
}
interface EventFormProps{
    title: string;
    btn: string;
    event?: EventModel; // can use a '?' to mark option types in an interface (same as in classes/types etc.)
    creator: Organizer;
    formErrors: FormErrors[];
    submitCallback: Function;
}

const EventForm = (props: EventFormProps) => {
    const { title, btn, event, creator, submitCallback } = props;
    
    const thisEvent =  event || new EventModel('','','', new Date(), 1, creator, []);

    const [eventName, setEventName] = useState(thisEvent.name);
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(e.target.value);
    }

    const [eventDescription, setEventDescription] = useState(thisEvent.description);
    const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventDescription(e.target.value)
    }
    
    const [eventType, setEventType] = useState(thisEvent.type);
    const onTypeChange = (e: SelectChangeEvent<string>) => {
        setEventType(e.target.value)
    }

    const [eventDate, setEventDate] = useState(thisEvent.date);

    const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("halp");
        setEventDate(new Date(e.target.value));
    }

    const [eventIntensity, setEventIntensity] = useState(thisEvent.intensity);
    const onIntensityChange = (e: React.SyntheticEvent | Event, value: number | Array<number>) => {
        if (typeof value !== 'number'){
            value = value[0];
        }
        setEventIntensity(value)
    }

    const [userFirstName, setUserFirstName] = useState('');
    const onUserFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFirstName(e.target.value)
    }
    const [userLastName, setUserLastName] = useState('');
    const onUserLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserLastName(e.target.value)
    }
    const [userEmail, setUserEmail] = useState('');
    const onUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value)
    }
    const [eventUsers, setEventUsers] = useState(thisEvent.users);
    const onNewUser = (e: React.FormEvent) => {
        let newUser = new User(userFirstName, userLastName, userEmail);
        setEventUsers([...eventUsers, newUser]);
        setUserFirstName('');
        setUserLastName('');
        setUserEmail('');
    }
    
    const submitHandler = () => {
        thisEvent.name = eventName;
        thisEvent.description = eventDescription;
        thisEvent.type = eventType;
        thisEvent.date = eventDate;
        thisEvent.intensity = eventIntensity;
        thisEvent.users = eventUsers;
        submitCallback(thisEvent);
    }

    return (
    <>
    <Box
    style={ boxStyle }
    component="form"
    sx={{
    '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"

    onSubmit={(e: React.FormEvent) => {e.preventDefault(); submitHandler() }}>

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

                onChange={ (e: React.ChangeEvent<HTMLInputElement> ) => onDateChange(e) }

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
                    onChange= {(e: SelectChangeEvent<string>, child: ReactNode) => onTypeChange(e) }
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
                    onChangeCommitted={(e: Event | SyntheticEvent<Element, Event>, value: number | Array<number>) => onIntensityChange(e, value) }
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

                            value={""+thisEvent.organizer.firstName+ ' '+ thisEvent.organizer.lastName}

                            InputProps={{
                                readOnly: true,
                            }}
                            /><br/>

                            <TextField
                            required
                            id="outlined-name"
                            label="Organizer Email"
                            type='email'

                            value={thisEvent.organizer.email}

                            InputProps={{
                                readOnly: true,
                            }}
                            /><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <br/>


                
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
                                {user.firstName}{user.lastName} ({user.email})
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
                            onSubmit={(e: React.FormEvent) => {e.preventDefault(); onNewUser(e) }}>
                            
                            <TextField
                            id="outlined-name"
                            label="First Name"
                            placeholder="User's First"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserFirstNameChange(e) }
                            value={userFirstName}
                            helperText="Required: 2+ Characters!"
                            />
                            <br/>

                            <TextField
                            id="outlined-name
                            "
                            label="Last Name"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserLastNameChange(e) }
                            value={userLastName}
                            helperText="Required: 2+ Characters!"
                            />
                            <br/>

                            <TextField
                            id="outlined-name"
                            label="Email"
                            value={userEmail}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserEmailChange(e) }
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
    </>
    )
}

export default EventForm