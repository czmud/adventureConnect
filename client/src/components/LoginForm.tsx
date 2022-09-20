import React from 'react'
import { Link } from 'react-router-dom'
import { TextField, Input, Box, FormControl, IconButton, OutlinedInput, InputLabel, InputAdornment, FormHelperText } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/Visibility'

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

const LoginForm = () => {
    const [values, setValues] = React.useState<any>({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({...values,
        showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
            <h1>Organizer Login</h1>

        <TextField
            required
            id="outlined-name"
            label="Email"
            type='email'
            helperText="Required: Valid email"
        /><br/>

    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
            }
            label="Password"
            />
        <FormHelperText>Required: 8+ Characters</FormHelperText>
    </FormControl>
    <br/>

    <Input style={ submitStyle } type='submit' value='Login'/>
    
    <p>Want to organize your own trips? </p><Link to='/register'>Register as Organizer</Link>

    </Box>
    )
}

export default LoginForm