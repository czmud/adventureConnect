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

const RegisterForm = () => {
    const [values, setValues] = React.useState<any>({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false
    });
    
    const handleClickShowPassword = () => {
        setValues({...values,
        showPassword: !values.showPassword,
        });
    };
    const handleClickShowConfirmPassword = () => {
        setValues({...values,
            showConfirmPassword: !values.showConfirmPassword,
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
        onSubmit={(event: React.FormEvent) => {event.preventDefault(); console.log("Submitted")}}>
            <h1>Register as Organizer</h1>
    <TextField
    required
    id="outlined-name"
    label="First Name"
    placeholder="Placeholder"
    helperText="Required: 2+ Characters!"
    /><br/>

    <TextField
    required
    id="outlined-name"
    label="Last Name"
    helperText="Required: 2+ Characters!"
    /><br/>

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

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
        <OutlinedInput
            id="outlined-adornment-password"
            type={values.showConfirmPassword ? 'text' : 'password'}
            
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
            }
            label="Confirm Password"
            />
        <FormHelperText>Required: Must match password</FormHelperText>
        </FormControl>
        <br/>

    <Input style={ submitStyle } type='submit' value='Register'/>
    
    <p>Already have an Account? <Link to='/login'>Login</Link></p>
    
    </Box>
    )
}

export default RegisterForm