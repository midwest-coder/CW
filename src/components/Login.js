import { Card, Grid, Typography, TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AccountCircle, Email, Lock } from '@material-ui/icons';
import Auth from '../services/Auth'
import { grey } from '@material-ui/core/colors'
import { AuthContext } from '../context/AuthContext'

const useStyles = makeStyles((theme) => ({
  card: {
      background: 'linear-gradient(45deg, #113C70, #3D0757)',
      marginTop: 40,
      padding: 100,
      paddingTop: 40,
  },
  h4: {
    color: 'white',
    textShadow: '2px 2px black',
    marginBottom: 20,
  },
  textField: {
    marginTop: 10,
  },
  button: {
    background: 'linear-gradient(45deg, #32a883, #3290a8)',
    color: 'white',
    marginTop: 30,
  },
  purple: {
      background: 'linear-gradient(45deg, #113C70, #3D0757)',
      color: grey[100]
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
})
)

 function Login(props){
  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const [usernameError, setUsernameError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogText, setDialogText] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')
  const [userErrMsg, setUserErrMsg] = useState('')
  const [passErrMsg, setPassErrMsg] = useState('')
  const [userValue, setUserValue] = useState('')
  const [passValue, setPassValue] = useState('')

  const checkUsername = (value) => {
    setUserValue(value)
  }

  const checkPassword = (value) => {
    setPassValue(value)
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const submitData = (e) => {
    e.preventDefault()
    if(userValue === '' && passValue === '') {
      setDialogOpen(true)
      setDialogTitle('Hey Wait')
      setDialogText("You didn't even fill it out at all ya goof! Do us a solid and get that all filled out")
    } else if(userValue === '') {
      setDialogOpen(true)
      setDialogTitle('Hey Wait')
      setDialogText("You didn't even fill out your username ya goof! Do us a solid and get that filled out")
    } else if(passValue === '') {
      setDialogOpen(true)
      setDialogTitle('Hey Wait')
      setDialogText("You didn't even fill out your password ya goof! Do us a solid and get that filled out")
    } else if(usernameError && passError) {
      setDialogOpen(true)
      setDialogTitle('Uh Oh')
      setDialogText("Looks like there's a tiny issue with your username and password. Do us a favor and give it a quick look over.")
    } else if(usernameError) {
      setDialogOpen(true)
      setDialogTitle('Uh Oh')
      setDialogText("Looks like there's a tiny issue with your username. Do us a favor and give it a quick look over.")
    } else if(passError) {
      setDialogOpen(true)
      setDialogTitle('Uh Oh')
      setDialogText("Looks like there's a tiny issue with your password. Do us a favor and give it a quick look over.")
    } else {
        const user = {username: userValue, password: passValue}
      // Auth.register(user).then((data) => {
      //   if(!data.msgError)
        authContext.setIsLoaded(false)
        Auth.login(user).then((data) => {
        const { user, isAuthenticated, message } = data
        authContext.setUser(user)
        authContext.setIsAuthenticated(isAuthenticated)
        if(!isAuthenticated){
            setDialogOpen(true)
            setDialogTitle('Uh Oh')
            setDialogText("Looks like that username and password was invalid. Give it another try")
        }
        authContext.setIsLoaded(false)
        })
      //     else
      //       alert(`Error occured registering user`)
      // })
    }
  }

  
  const switchPanel = () => {
    props.switchPanel()
  }

    return (
      <React.Fragment>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialogText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Okay
              </Button>
            </DialogActions>
        </Dialog>
        <Grid container
        direction="column-reverse"
        justify="center"
        alignItems="center">
          <Grid item xs={12}>
            <Card className={classes.card}>
              {/* <Typography variant="h4" className={classes.h4} align="center">
                Log In
              </Typography> */}
              <form onSubmit={(e) => {submitData(e)}}>
                <div>
                  <TextField 
                    id="standard-basic" 
                    label="Username"
                    type="text"
                    helperText={userErrMsg}
                    error={usernameError}
                    onInput={(e) => {checkUsername(e.target.value)}}
                    autoComplete="off"
                    className={classes.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}/>
                </div>
                <div>
                  <TextField 
                    id="standard-basic" 
                    label="Password" 
                    type="password"
                    helperText={passErrMsg}
                    error={passError}
                    onInput={(e) => {checkPassword(e.target.value)}}
                    className={classes.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}/>
                </div>
                  <Button 
                    className={classes.button} 
                    variant="contained" 
                    type="submit"
                    fullWidth>
                      Log In
                  </Button>
              </form>
              <Typography type="subtitile1">or</Typography>
              <Button
                    className={classes.purple} 
                    variant="contained" 
                    onClick={() => switchPanel()}>
                Sign Up
              </Button>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}

export default Login;
