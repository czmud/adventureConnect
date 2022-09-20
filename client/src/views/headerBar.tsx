import React from 'react'
import { useNavigate } from 'react-router-dom';
import SkyBackground from '../images/clouds.gif'

const HeaderBar = ( props: any ) => {
    const { title, btnTitle, btnRoute } = props;
    const nav = useNavigate();

    const headStyle = {
        height: '100px',
        width: '100%',
        borderBottom: '2px solid black',margin: '0px',
        display: 'flex',
        justifyContent: 'space-around', 
        alignItems: 'center',
        background: 'rgba(76, 175, 80, 0.3)'
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
        <h1>{ title }</h1>
        <button style= { buttonStyle } onClick={()=> nav('/'+btnRoute)}>{btnTitle}</button>
    </div>)
}

export default HeaderBar