import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Input, Box, FormControl, IconButton, OutlinedInput, InputLabel, InputAdornment, FormHelperText } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/Visibility'
import { LoginOrganizer } from '../../models/LoginOrganizer.model'
import axios from 'axios';
axios.defaults.withCredentials = true;

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

interface LoginErrors{
    path: string;
    message: string;
}

type Action = {
    type: string, payload: string
}

function reducer( oneOrganizer: LoginOrganizer, action: Action ){
    return {
        ...oneOrganizer,
        [action.type]: action.payload
    };
}

const LoginForm = () => {
    const navigate = useNavigate();
    const [oneOrganizer, dispatch] = React.useReducer( reducer, new LoginOrganizer());
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [ errors, setErrors ] = React.useState<LoginErrors[]>([]);

    const handleChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch({
            type: name,
            payload: value
        })
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword,);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const redirectAfterSuccessfulLogin = () => {
        navigate("/dashboard");
    }

    const submitLoginForm = (event: React.FormEvent, oneOrganizer: LoginOrganizer, successCallback: Function) => {
        event.preventDefault();
        axios.post( 'http://localhost:8000/api/organizers/login', oneOrganizer )
            .then( () => successCallback())
            .catch( errors => {
                console.log(errors);
                const errorResponse = errors.response.data.errors;
                const errorList: LoginErrors[] = [];
                for( const key of Object.keys(errorResponse)){
                    errorList.push({
                        path: errorResponse[key].path,
                        message: errorResponse[key].message
                    });
                }
                setErrors(errorList);
            });
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
        onSubmit={ (event: React.FormEvent) => submitLoginForm(event, oneOrganizer, redirectAfterSuccessfulLogin)}>
            <h1>Organizer Login</h1>

        <TextField
            required
            id="outlined-name"
            label="Email"
            type='email'
            name="email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
            helperText="Required: Valid email"
        /><br/>

    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
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