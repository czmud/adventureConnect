import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
    const navigate = useNavigate();

    const redirectAfterSuccessfulLogout = () => {
        navigate("/login");
    }

    const logOrganizerOut = (event: React.MouseEvent<HTMLButtonElement>, successCallback: Function) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/organizers/logout")
            .then(() => successCallback())
            .catch(errors => console.log(errors));
    }

    return(
        <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => logOrganizerOut(event, redirectAfterSuccessfulLogout)} type="button">Logout</button>
    )
}