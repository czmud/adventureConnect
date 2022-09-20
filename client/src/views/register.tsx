import React from 'react'

import HeaderBar from './headerBar'
import Background from '../images/camoCollage.png'
import RegisterForm from '../components/RegisterForm'

const imageStyle ={
    height: '1200px',
    width: '100%',
    margin: '0px',
    position: 'absolute' as 'absolute',
    left: '0',
    zIndex: '-1',
    opacity: '75%'
}

const Register = () => {

    return (<>
    
    <HeaderBar title='Start Organizing Today!' btnTitle='Home' btnRoute=''/>
    <img style={ imageStyle } alt='background camo' src={ Background }/>
    <RegisterForm />
    </>)
}

export default Register

