import React, { ReactNode, SetStateAction, SyntheticEvent, useState} from 'react'
import { TextField, Box, Input, MenuItem, Slider, Typography, Tooltip, SliderValueLabelProps, FormHelperText, Accordion, AccordionDetails, AccordionSummary, TableContainer, Table, TableRow, TableHead,TableCell, tableCellClasses, TableBody, styled, Paper, OutlinedInput, FormControl, Select, InputLabel, SelectChangeEvent } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventModel from '../../models/EventModel'
import Organizer from '../../models/Organizer'
import User from '../../models/User'
import { useNavigate } from 'react-router-dom';
const mediaQuery = require('css-mediaquery')

//===========All Styling Content======
const boxStyle = {
    background: 'rgba(200, 200, 200)',
    width: '60%',
    height: 'auto',
    margin: '20px 20% 0px',
    borderRadius: '40px'
}
const boxStyle2 = {
    background: 'white',
    width: '100%',
    borderRadius: '0 0 20px 20px',
    zIndex: 2
}
const addForm = {
    width: '85%',
    height: '3em',
    margin: '0 0 15% 0'
}
const splitForm = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8%'
}
const formSide = {
    width:'47%',
    positions: 'relative',
    padding: '0 2%'
}

const submitStyle ={
    background: 'black',
    color: 'white',
    width: '100px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    margin: '0 5px 4%',
    postion: 'relative',
    boxShadow: '2px 2px darkgrey'
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width:'20%'
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
    formErrors: { [path: string]: FormErrors };
    submitCallback: Function;
}

const EventForm = (props: EventFormProps) => {
    const nav = useNavigate();
    const { title, btn, event, creator, submitCallback, formErrors } = props;
    
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

    const onDateChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        console.log("halp");
        let value2: unknown = value as unknown
        setEventDate(value2 as SetStateAction<Date>);
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
        console.log(newUser);
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

    function smallMatch(wWidth: number): boolean {
        return mediaQuery.match('screen and (max-width: 626)', {
            type : 'screen',
            width: wWidth
        });}
    let small: boolean = smallMatch(window.innerWidth)

    function largeMatch(wWidth: number): boolean {
        return mediaQuery.match('screen and (min-width: 1200)', {
            type : 'screen',
            width: wWidth
        });}
    let large: boolean = largeMatch(window.innerWidth)

    function handleResize() {
            let small2 = smallMatch(window.innerWidth);
            let large2 = largeMatch(window.innerWidth);
            
            if (small === small2 && large === large2){

            } else {
            small = small2;
            large = large2;
            small === true ? window.location.reload() : 
            large === true ? window.location.reload() : 
            window.location.reload()
            }
    }
    
    window.addEventListener('resize', handleResize)

    return (
    <>
    <Box
    style={ boxStyle }
    component="form"
    sx={{
    '& .MuiTextField-root': { m: 1, width: '25ch' },
    zIndex: '0'}}
    noValidate
    autoComplete="off"

    onSubmit={(e: React.FormEvent) => {e.preventDefault(); submitHandler() }}>
        <h1>{ title }</h1>
        <div style={ splitForm }>
            <div style={ formSide }>

                {formErrors.name ? 
                <TextField
                error
                required
                style={{width: '100%'}}
                value={eventName}
                onChange = { onNameChange }
                id="outlined-error"
                label="Name Error"
                InputLabelProps={{
                    shrink: true
                }}
                helperText={formErrors.name.message}
                /> :
                <TextField
                required
                style={{width: '100%'}}
                value={eventName}
                onChange = { onNameChange }
                id="outlined-name"
                label="Event Name"
                InputLabelProps={{
                    shrink: true
                }}
                helperText="Required: 2+ Characters!"
                />}
                <br/><br/><br/>

                {formErrors.description ? 
                <TextField
                error
                required
                style={{ width: '100%' }}
                value={eventDescription}
                onChange={ onDescriptionChange }
                id="outlined-multiline-static"
                InputLabelProps={{
                    shrink: true
                }}
                label="Description Error"
                multiline
                rows={4}
                helperText={formErrors.description.message}
                /> :
                <TextField
                required
                style={{ width: '100%' }}
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
                />}
                <br/><br/><br/>


                { formErrors.date ? 
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                    renderInput={(props) => <TextField {...props} error style={{width: '100%', marginBottom: '-5%'}} helperText={formErrors.date.message}/>}
                    label="DateTimePicker Error"
                    value={eventDate}
                    disablePast= {true}
                    onChange={ (value: React.ChangeEvent<HTMLInputElement> | null) => {if (value){
                        onDateChange(value)
                    }}
                    }/>
                </LocalizationProvider> :
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                    renderInput={(props) => <TextField {...props} style={{width: '100%'}}/>}
                    label="DateTimePicker"
                    value={eventDate}
                    // disablePast= {true}
                    onChange={ (value: React.ChangeEvent<HTMLInputElement> | null) => {if (value){
                        onDateChange(value)
                    }}
                    }/>
                </LocalizationProvider>}
                <br/><br/><br/>


                <FormControl sx={{ m: 1, width: '100%', mt: 1 }}>
                    <InputLabel
                    sx={{position: 'relative', top: '20px',left: '-10%', fontSize: 'min(2vw, 15px)',
                }}
                    variant="standard"
                    htmlFor="native-select">Select Event Type</InputLabel>
                    { formErrors.type ? <Select
                    displayEmpty
                    value={ eventType }
                    onChange= {(e: SelectChangeEvent<string>, child: ReactNode) => onTypeChange(e) }
                    input={<OutlinedInput error sx={{position:'relative', top:'10px'}}/>}
                    renderValue={(selected) => {
                        return selected
                    }}
                    sx={{position: 'relative',
                    top: '10px'}}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {types.map((name, idx) => (
                        <MenuItem
                        key={idx}
                        sx={{width: '100%', paddingLeft: '10%'}}
                        value={name}
                        >
                            {name}
                        </MenuItem>
                ))}
                    </Select> :
                    <Select
                    displayEmpty
                    value={ eventType }
                    onChange= {(e: SelectChangeEvent<string>, child: ReactNode) => onTypeChange(e) }
                    input={<OutlinedInput sx={{position:'relative', top:'10px'}}/>}
                    renderValue={(selected) => {
                        return selected
                    }}
                    sx={{position: 'relative',
                    top: '10px'}}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {types.map((name, idx) => (
                        <MenuItem
                        key={idx}
                        sx={{width: '100%', paddingLeft: '10%'}}
                        value={name}
                        >
                            {name}
                        </MenuItem>
                ))}
                    </Select>}
                </FormControl>
                <br/><br/><br/>

            </div>
            <div style={ formSide }>

                <Box zIndex={'3'} sx={{ m: 3 }}>
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
                        width: '100%'
                    }}
                    components={{
                    ValueLabel: ValueLabelComponent,
                    }}/>
                    <FormHelperText id="my-helper-text">0 (easy) - 5 (intense)</FormHelperText>
                </Box>
                <br/><br/>

                <Accordion sx={{zIndex: 20, display: 'flex', flexDirection: 'column'}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Event Organizer</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{position: 'absolute', left: '5%', right: '5%', margin: '0', padding: '0' }}>
                        <Typography>
                            <Box style={ boxStyle2 }>
                            <TextField
                            style={ addForm }
                            required
                            id="outlined-name"
                            label="Organize Name"

                            value={""+thisEvent.organizer.firstName+ ' '+ thisEvent.organizer.lastName}
                            InputProps={{
                                readOnly: true,
                            }}
                            /><br/>
                            <TextField
                            style={ addForm }
                            required
                            id="outlined-name"
                            label="Organizer Email"
                            type='email'
                            value={thisEvent.organizer.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            /></Box><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>

                
                <Paper sx={{ width: '70%', margin: '0px 15%', overflow: 'scroll'}}>
                <TableContainer sx={{ maxHeight: 160 }}>
                <Table size='small' stickyHeader  aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Users Going: </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { eventUsers.length > 0 ? 
                    eventUsers.map((user: User, idx: number) => (
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
            </div>
        </div>

    <Input onClick={()=> {nav('/dashboard')}} style={ submitStyle } type='submit' value="Cancel"/>
    <Input style={ submitStyle } type='submit' value={ btn }/>
    
    </Box>
                        
    { small ? 
    <Accordion sx={{zIndex: 10, display: 'flex', flexDirection: 'column', width: '26%', position: 'relative', bottom: '360px', left: '53%'}}>
    <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1a-content"
    id="panel1a-header"
    >
    
        <Typography >Add New Users</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{position: 'absolute', left: '5%', right: '5%', margin: '0', padding: '0' }}>
        <Typography>
            <Box
            style={ boxStyle2 }
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={(e: React.FormEvent) => {e.preventDefault(); onNewUser(e) }}>
            
                <TextField
                style= {addForm}
                id="outlined-name"
                label="First Name"
                InputLabelProps={{
                    shrink: true
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserFirstNameChange(e) }
                value={userFirstName}
                />

                <TextField
                style= {addForm}
                id="outlined-name
                "
                label="Last Name"
                InputLabelProps={{
                    shrink: true
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserLastNameChange(e) }
                value={userLastName}
                />

                <TextField
                style= {addForm}
                id="outlined-name"
                InputLabelProps={{
                    shrink: true
                }}
                label="Email"
                value={userEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserEmailChange(e) }
                type='email'
                />

                <Input style={ submitStyle } type='submit' value='Add New'/>
        </Box>
        </Typography>
    </AccordionDetails>
</Accordion> : 
    large ? 
    <Accordion id="NewEventGoer" sx={{zIndex: 10, display: 'flex', flexDirection: 'column', width: '26%', position: 'relative', bottom: '440px', left: '53%'}}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        
            <Typography >Add New Users</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{position: 'absolute', left: '5%', right: '5%', margin: '0', padding: '0' }}>
            <Typography>
                <Box
                style={ boxStyle2 }
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={(e: React.FormEvent) => {e.preventDefault(); onNewUser(e) }}>
                
                    <TextField
                    style= {addForm}
                    id="outlined-name"
                    label="First Name"
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserFirstNameChange(e) }
                    value={userFirstName}
                    />

                    <TextField
                    style= {addForm}
                    id="outlined-name
                    "
                    label="Last Name"
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserLastNameChange(e) }
                    value={userLastName}
                    />

                    <TextField
                    style= {addForm}
                    id="outlined-name"
                    InputLabelProps={{
                        shrink: true
                    }}
                    label="Email"
                    value={userEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserEmailChange(e) }
                    type='email'
                    />

                    <Input style={ submitStyle } type='submit' value='Add New'/>
            </Box>
            </Typography>
        </AccordionDetails>
    </Accordion> : 
    <Accordion sx={{zIndex: 10, display: 'flex', flexDirection: 'column', width: '26%', position: 'relative', bottom: '400px', left: '53%'}}>
    <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1a-content"
    id="panel1a-header"
    >
    
        <Typography >Add New Users</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{position: 'absolute', left: '5%', right: '5%', margin: '0', padding: '0' }}>
        <Typography>
            <Box
            style={ boxStyle2 }
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={(e: React.FormEvent) => {e.preventDefault(); onNewUser(e) }}>
            
                <TextField
                style= {addForm}
                id="outlined-name"
                label="First Name"
                InputLabelProps={{
                    shrink: true
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserFirstNameChange(e) }
                value={userFirstName}
                />

                <TextField
                style= {addForm}
                id="outlined-name
                "
                label="Last Name"
                InputLabelProps={{
                    shrink: true
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserLastNameChange(e) }
                value={userLastName}
                />

                <TextField
                style= {addForm}
                id="outlined-name"
                InputLabelProps={{
                    shrink: true
                }}
                label="Email"
                value={userEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUserEmailChange(e) }
                type='email'
                />

                <Input style={ submitStyle } type='submit' value='Add New'/>
        </Box>
        </Typography>
    </AccordionDetails>
</Accordion>}
    </>
    )
}

export default EventForm