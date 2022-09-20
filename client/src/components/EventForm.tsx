import React from 'react'
import { TextField, Box, Input, MenuItem, Slider, Typography, FormHelperText } from '@mui/material';

const boxStyle = {
    background: 'rgba(200, 200, 200)',
    width: '60%',
    margin: '80px 20% 0px',
    borderRadius: '40px',
    padding: '15px'
}
const submitStyle ={
    background: 'gray',
    width: '100px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    margin: '20px 0px'
}

const EventForm = () => {
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
            <h1>Create an Event</h1>
    <TextField
        required
        id="outlined-name"
        label="Event Name"
        helperText="Required: 2+ Characters!"
    /><br/>

    <TextField
        id="outlined-multiline-static"
        label="Event Description"
        multiline
        rows={4}
        helperText="Required: 10+ Characters!"
        />
        <br/>

    <TextField
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
    <br/>

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
    />

    <br/>


    <Input style={ submitStyle } type='submit' value='Create'/>
    
    </Box>
    )
}

export default EventForm