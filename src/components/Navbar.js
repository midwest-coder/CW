import logo from '../images/cryptoWars.png'
import React from 'react'
import { AppBar, IconButton, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  appbar: {
    background: 'black',
    color: 'white'
  },
  logo: {
    height: '50%',
    width: '50%',
  }
})

function Navbar() {
  const classes = useStyles()
    return (
        <AppBar position="static" className={classes.appbar}>
              <Toolbar className="justify-content-center">
                <IconButton>
                  <img alt="Crypto Wars" src={logo} className={classes.logo}/>
                </IconButton>
              </Toolbar>
        </AppBar>
    );
}

export default Navbar;
