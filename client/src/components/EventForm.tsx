import React from 'react'
import { TextField, Box, Input, MenuItem, Slider, Typography, Tooltip, SliderValueLabelProps, FormHelperText, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    width: '90%'
}

const submitStyle ={
    background: 'gray',
    width: '100px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    margin: '20px 5px',
    postion: 'relative'
}
function ValueLabelComponent(props: SliderValueLabelProps) {
    const { children, value } = props;

    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
        </Tooltip>
    );
    }
const EventForm = (props: any) => {
    const { title, btn } = props;
    const users = [
        { name: 'Jake Riler', email: 'jr@gmail.com'},
        { name: 'Ben Brunton', email: 'bb@gmail.com'},
        { name: 'Anjela Sanches', email: 'as@gmail.com'},
        { name: 'Naile Grunich', email: 'ng@gmail.com'},
        { name: 'Ernie Wontred', email: 'ew@gmail.com'}
    ]

    return (
    <Box
    style={ boxStyle }
    component="form"
    sx={{
    '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    onSubmit={(e) => {e.preventDefault(); console.log("Submitted")}}>
        <h1>{ title }</h1>
        <div style={ splitForm }>
            <div style={ formSide }>
                <TextField
                required
                fullWidth
                defaultValue="props.eventName"
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
                defaultValue="props.description"
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
                id="outlined-name"
                type="datetime-local"
                InputLabelProps={{
                    shrink: true
                }}
                label="Event Time"
                helperText="Required"
                />
                <br/><br/><br/>

                <TextField
                required
                fullWidth
                id="outlined-select-currency"
                select
                label="Select"
                defaultValue='Trip Type'
                helperText="Please select the Type of Event"
                >
                    <MenuItem >Hiking</MenuItem>
                    <MenuItem >BackPacking</MenuItem>
                    <MenuItem >Climbing</MenuItem>
                    <MenuItem >Camping</MenuItem>
                    <MenuItem >Rafting</MenuItem>
                    <MenuItem >Boating</MenuItem>
                    <MenuItem >Extreme Sports</MenuItem>
                </TextField>
                <br/><br/><br/>
            </div>
            <div style={ formSide }>
                <>
                <Box sx={{ m: 3 }}>
                    <Typography gutterBottom align="left">Intensity Rating</Typography>
                    <Slider
                    aria-label="Intensity Rating"
                    defaultValue={1}
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
                            value='{Organizer.first + .last}'
                            InputProps={{
                                readOnly: true,
                            }}
                            /><br/>

                            <TextField
                            required
                            id="outlined-name"
                            label="Oraganizer Email"
                            type='email'
                            value="{Organizer.email}"
                            InputProps={{
                                readOnly: true,
                            }}
                            /><br/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <br/>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>Add New Users</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
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
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                { users.map((user, idx) => { return <>
                    <p key={idx}>{user}</p>
                </>})}
            </>
            </div>
        </div>

    <Input style={ submitStyle } type='submit' value="Cancel"/>
    <Input style={ submitStyle } type='submit' value={ btn }/>
    
    </Box>
    )
}

export default EventForm