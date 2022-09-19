import React from 'react'
import { useNavigate } from 'react-router-dom';

const HeaderBar = () => {
    const nav = useNavigate();

    const headStyle = {
        height: '100px',
        width: '100%',
        borderBottom: '2px solid black',margin: '0px',
        display: 'flex',
        justifyContent: 'space-around', 
        alignItems: 'center'
    }
    const titleStyle={
        color: 'purple',
        fontSize: '50px'
    }
    const buttonStyle={
        height: '30%',
        width: '8%',
    }

    return (<div style={ headStyle }>
        <h1 style={titleStyle}>AdvCon</h1>
        <h2>Upcoiming Events</h2>
        <button style= { buttonStyle } onClick={()=> nav('/login')}>Login</button>
    </div>)
}

export default HeaderBar