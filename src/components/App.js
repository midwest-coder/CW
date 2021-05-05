import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Loading from './Loading'
import { Snackbar, Button, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AlertBox from './AlertBox'
// import io from 'socket.io-client'
import Main from './Main'
import Navbar from './Navbar'
// import Auth from '../services/Auth'

import { Container } from '@material-ui/core'
import './App.css'
import FrontPage from './FrontPage'
import WelcomeDialog from './WelcomeDialog'
import Admin from './Admin/Admin'
// import axios from 'axios'

// const socket = io.connect('http://localhost:4000')

function App() {
  const { isAuthenticated, user, newUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    open:false,
    duration:6000,
    anchor:{
      vertical: 'bottom',
      horizontal: 'center',
    },
    message:'Okay',
    action:true
  })

  const handleClose = (event, reason) => {
    setAlert(false)
  }
  
    let content
    let welcome
    // const loadingContent = <Loading loading={isLoaded} />
    if(user != null){
      if(!isAuthenticated) {
        content = 
        <FrontPage setLoading={setLoading} />
      }
      else {
        if(user.role === "admin") {
          content = <Admin setLoading={setLoading} />
        } else {
        content = <Main user={user} setLoading={setLoading} setAlert={setAlert} />
      }
    } 
    if(newUser)
    welcome = <WelcomeDialog />
    else
    welcome = ''
  }
    
    return (
      <React.Fragment>
        <Navbar />
          <Container>
            <AlertBox alert={alert} setAlert={setAlert}/>
            <Loading loading={loading} />
            {welcome}
            {content}
          </Container>
        </React.Fragment>
    );
}

export default App;
