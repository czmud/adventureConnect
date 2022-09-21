import React from 'react'
import { TextField, Box, Input, MenuItem, Slider, Typography, Tooltip, SliderValueLabelProps, FormHelperText, Accordion, AccordionDetails, AccordionSummary, TableContainer, Table, TableRow, TableHead,TableCell, tableCellClasses, TableBody, styled, Paper } from '@mui/material';
import { positions } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    width: '90%'
}
const tableStyle={
    width: '60%',
    margin: '0px 20%',
    zIndex: ''
}
const rowStyle = {
    height: '20px'
}
const submitStyle ={
    background: 'gray',
    width: '100px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    margin: '20px 5px',
    postion: 'relative'
}

//=======Form intefaces=============
interface User{
    firstName: string;
    lastName: string;
    email: string;
}



//=========Form Funtions==============
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


// =======Actual Form component Starts Here=============

const EventForm = (props: any) => {
    const { title, btn } = props;
    const users: User[] = [
        { firstName: 'Jake', lastName:'Riler', email: 'jr@gmail.com'},
        { firstName: 'Ben', lastName:'Brunton', email: 'bb@gmail.com'},
        { firstName: 'Anjela', lastName:'Sanches', email: 'as@gmail.com'},
        { firstName: 'Naile', lastName:'Grunich', email: 'ng@gmail.com'},
        { firstName: 'Ernie',  lastName:'Wontred', email: 'ew@gmail.com'}
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
                <br/>
                
                <Paper sx={{ width: '60%', margin: '0px 20%', overflow: 'scroll' }}>
                <TableContainer sx={{ maxHeight: 220 }}>
                <Table stickyHeader sx={{ minWidth: 400 }} aria-label="customized table">
                    <TableHead>
                        <TableRow style={rowStyle}>
                            <StyledTableCell>Users Going: </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { users.map((user: User, idx: number) => (
                        <StyledTableRow style={rowStyle} key={idx}>
                            <StyledTableCell component="th" scope="row">
                                {user.firstName}{user.lastName} ({user.email})
                            </StyledTableCell>
                            </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </Paper>
            </>
            </div>
        </div>

    <Input style={ submitStyle } type='submit' value="Cancel"/>
    <Input style={ submitStyle } type='submit' value={ btn }/>
    
    </Box>
    )
}

export default EventForm