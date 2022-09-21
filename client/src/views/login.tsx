import React from 'react'
import HeaderBar from './headerBar'
import Background from '../images/camoCollage.png'
import LoginForm from '../components/forms/LoginForm'

const imageStyle ={
    height: '1200px',
    width: '100%',
    margin: '0px',
    position: 'absolute' as 'absolute',
    left: '0',
    zIndex: '-1',
    opacity: '75%'
}

const login = () => {
    return (<>
    <HeaderBar title='Login' btnTitle='Home' btnRoute=''/>
    <img style={ imageStyle } alt='background camo' src={ Background }/>
        <LoginForm />
    </>)
}

export default login