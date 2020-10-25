import logo from '../images/cryptoWars.png'
import React from 'react'
import { AppBar, IconButton, Toolbar, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { grey } from '@material-ui/core/colors'

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
                  <img src={logo} className={classes.logo}/>
                </IconButton>
              </Toolbar>
        </AppBar>
    );
}

export default Navbar;
