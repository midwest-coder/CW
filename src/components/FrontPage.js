import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import { Button, Box, Container } from '@material-ui/core'
import LandImage from '../images/cb-landing.png'
import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles({
    box: {
        backgroundImage: `url(${LandImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: 500,
        width: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100],
        marginTop: 20,
        '&:hover': {
            color: grey[400]
        }
    },
    img: {
        width: 500,
        height: 500,
    }
})

function FrontPage(props) {
    const classes = useStyles()
    const [landingToggle, setLandingToggle] = useState(true)
    const [toggle, setToggle] = useState(true)
    let content = ''

    const switchPanel = () => {
        const temp = !toggle
        setToggle(temp)
    }

    const loadPanel = () => {
        setLandingToggle(false)
    }

    const setLoading = (value) => {
        props.setLoading(value)
    }
  
    const setAlert = (value) => {
      props.setAlert(value)
    }

    if(landingToggle)
        content = 
            <Container className={classes.box}>
                <Button className={classes.button} onClick={() => loadPanel()}>Get Started</Button>
            </Container>
    else {
        toggle ? 
        content = <Login setLoading={setLoading} switchPanel={switchPanel} setAlert={setAlert}/>
        :
        content = <Signup setLoading={setLoading} switchPanel={switchPanel}/>
    }
    
    return (
        <React.Fragment>
          {content}
      </React.Fragment>
    );
}

export default FrontPage;
