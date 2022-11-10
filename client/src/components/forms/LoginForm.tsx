import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	TextField,
	Input,
	Box,
	FormControl,
	IconButton,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	FormHelperText,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/Visibility';
import { LoginOrganizer } from '../../models/LoginOrganizer.model';
import axios from 'axios';
axios.defaults.withCredentials = true;

const boxStyle = {
	background: 'rgba(200, 200, 200)',
	width: '60%',
	margin: '80px 20% 0px',
	borderRadius: '40px',
	padding: '15px',
};
const submitStyle = {
	background: 'gray',
	width: '100px',
	borderTopLeftRadius: '5px',
	borderTopRightRadius: '5px',
	margin: '20px 0px',
};

interface FormErrors {
	path: string;
	message: string;
}

type Action = {
	type: string;
	payload: string;
};

function reducer(oneOrganizer: LoginOrganizer, action: Action) {
	return {
		...oneOrganizer,
		[action.type]: action.payload,
	};
}

const LoginForm = () => {
	const navigate = useNavigate();
	const [oneOrganizer, dispatch] = React.useReducer(reducer, new LoginOrganizer());
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [errors, setErrors] = React.useState<{ [path: string]: FormErrors }>({});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		dispatch({
			type: name,
			payload: value,
		});
	};
	const [values, setValues] = React.useState<any>({
		password: '',
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
		setValues({ ...values, showPassword: !values.showPassword });
	};
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const redirectAfterSuccessfulLogin = () => {
		navigate('/dashboard');
	};

	const submitLoginForm = (
		event: React.FormEvent,
		oneOrganizer: LoginOrganizer,
		successCallback: Function,
	) => {
		event.preventDefault();
		axios
			.post(process.env.REACT_APP_SERVER_URL + '/api/organizers/login', oneOrganizer)
			.then(() => successCallback())
			.catch((errors) => {
				const errorResponse = errors.response?.data.errors;
				if (errorResponse) {
					const errorDict: { [path: string]: FormErrors } = {};
					for (const key of Object.keys(errorResponse)) {
						errorDict[errorResponse[key].path] = {
							path: errorResponse[key].path,
							message: errorResponse[key].message,
						};
					}
					setErrors(errorDict);
				} else {
					console.error(errors);
				}
			});
	};

	return (
		<Box
			style={boxStyle}
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete="off"
			onSubmit={(event: React.FormEvent) =>
				submitLoginForm(event, oneOrganizer, redirectAfterSuccessfulLogin)
			}
		>
			<h1>Organizer Login</h1>
			{errors.email ? (
				<TextField
					error
					required
					id="outlined-name"
					label="Email Error"
					type="email"
					name="email"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
					helperText={errors.email.message}
				/>
			) : (
				<TextField
					required
					id="outlined-name"
					label="Email"
					type="email"
					name="email"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
					helperText="Required: Valid email"
				/>
			)}
			<br />

			{errors.password ? (
				<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
					<InputLabel error htmlFor="outlined-adornment-password">
						Password Error
					</InputLabel>
					<OutlinedInput
						error
						id="outlined-adornment-password"
						type={showPassword ? 'text' : 'password'}
						name="password"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleChange(event)
						}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
					/>
					<FormHelperText error>{errors.password.message}</FormHelperText>
				</FormControl>
			) : (
				<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						type={showPassword ? 'text' : 'password'}
						name="password"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleChange(event)
						}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
					/>
					<FormHelperText>Required: 8+ Characters</FormHelperText>
				</FormControl>
			)}
			<br />

			<Input style={submitStyle} type="submit" value="Login" />

			<p>Want to organize your own trips? </p>
			<Link to="/register">Register as Organizer</Link>
		</Box>
	);
};

export default LoginForm;
