import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Input, Box, FormControl, IconButton, OutlinedInput, InputLabel, InputAdornment, FormHelperText } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/Visibility'
import { RegisterOrganizer } from '../../models/RegisterOrganizer.model'
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

interface FormErrors{
    path: string;
    message: string;
}

type Action = {
    type: string, payload: string
}

function reducer( oneOrganizer: RegisterOrganizer, action: Action ){
    return {
        ...oneOrganizer,
        [action.type]: action.payload
    };
}

const RegisterForm = () => {
    const navigate = useNavigate();
    const [oneOrganizer, dispatch] = React.useReducer( reducer, new RegisterOrganizer() );
    const [values, setValues] = React.useState<any>({
        showPassword: false,
        showConfirmPassword: false
    });
    const [ errors, setErrors ] = React.useState<FormErrors[]>([]);

    const handleChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch({
            type: name,
            payload: value
        })
    }
    
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

    const redirectAfterSuccessfulRegistration = () => {
        navigate("/dashboard");
    }

    const submitRegistrationForm = (event: React.FormEvent, oneOrganizer: RegisterOrganizer, successCallback: Function ) => {
        event.preventDefault();
        axios.post( 'http://localhost:8000/api/organizers/register', oneOrganizer )
            .then( () => successCallback() )
            .catch( errors => {
                const errorResponse = errors.response.data.errors;
                const errorList: FormErrors[] = [];
                for( const key of Object.keys(errorResponse)){
                    errorList.push({
                        path: errorResponse[key].path,
                        message: errorResponse[key].message
                    })
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
<<<<<<< HEAD
        onSubmit={(event: React.FormEvent) => submitRegistrationForm(event, oneOrganizer, redirectAfterSuccessfulRegistration) }>
=======
        onSubmit={(event: React.FormEvent) => {event.preventDefault(); console.log("Submitted")}}>
>>>>>>> 7cd9275 (added login functionality. JWTs for auth working.)
            <h1>Register as Organizer</h1>
    <TextField
    required
    id="outlined-name"
    label="First Name"
    name="firstName"
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
    placeholder="Placeholder"
    helperText="Required: 2+ Characters!"
    /><br/>

    <TextField
    required
    id="outlined-name"
    label="Last Name"
    name="lastName"
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
    helperText="Required: 2+ Characters!"
    /><br/>

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
            type={values.showPassword ? 'text' : 'password'}
            name="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
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
            name="confirmPassword"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
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