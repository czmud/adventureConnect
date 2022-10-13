import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const buttonStyle={
    maxHeight: '40%',
    minHeight: '20%',
    width: '8%',
    fontSize: '1.35vw'
}

export const LogoutButton = () => {
    const navigate = useNavigate();

    const redirectAfterSuccessfulLogout = () => {
        navigate("/login");
    }

    const logOrganizerOut = (event: React.MouseEvent<HTMLButtonElement>, successCallback: Function) => {
        event.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_URL+'/api/organizers/logout')
            .then(() => successCallback())
            .catch(errors => console.log(errors));
    }

    return(
        <button style={buttonStyle} onClick={(event: React.MouseEvent<HTMLButtonElement>) => logOrganizerOut(event, redirectAfterSuccessfulLogout)} type="button">Logout</button>
    )
}