import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Loading from '../components/Loading'
// import io from 'socket.io-client'
// import Web3 from 'web3'
// import BSBack from '../abis/BSBack.json'
// import DaiToken from '../abis/DaiToken.json'
// import Loading from './Loading'
import Main from './Main'
import Navbar from './Navbar'
// import Auth from '../services/Auth'

import { Container } from '@material-ui/core'
import './App.css'
import FrontPage from './FrontPage'
// import axios from 'axios'

// const socket = io.connect('http://localhost:4000')

function App() {
  const { isAuthenticated } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

    let content
    // const loadingContent = <Loading loading={isLoaded} />
    if(!isAuthenticated) {
      content = 
        <FrontPage setLoading={setLoading} />
    }
    else {
      content = 
        <Main setLoading={setLoading} />
    }

    return (
      <React.Fragment>
        <Navbar />
          <Container>
            <Loading loading={loading} />
            {content}
          </Container>
        </React.Fragment>
    );
}

export default App;
