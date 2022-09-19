import React from 'react'
import { TextField } from '@mui/material'
import HeaderBar from './headerBar'

const register = () => {
    return (<>
    <HeaderBar title='Register'/>
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    <div>register</div>
    </>)
}

export default register