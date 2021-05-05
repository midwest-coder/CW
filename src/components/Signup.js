import { Card, Grid, Typography, TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Link } from '@material-ui/core';
import React, { useState, useContext } from 'react'
import Recaptcha from 'react-google-recaptcha'
import { makeStyles } from '@material-ui/core/styles'
import { AccountCircle, Email, Lock } from '@material-ui/icons';
import Auth from '../services/Auth'
import { blue, grey, lightBlue } from '@material-ui/core/colors'
import { AuthContext } from '../context/AuthContext'
import Backdrop from '@material-ui/core/Backdrop'
import { CircularProgress } from '@material-ui/core';
import Terms from './Terms';

const useStyles = makeStyles((theme) => ({
  card: {
      background: 'linear-gradient(45deg, #113C70, #3D0757)',
      marginTop: 40,
      padding: 80,
      paddingTop: 40,
      paddingBottom: 40
  },
  h4: {
    color: 'white',
    textShadow: '2px 2px black'
  },
  textField: {
    marginTop: 10,
  },
  button: {
    background: 'linear-gradient(45deg, #32a883, #3290a8)',
    color: 'white',
    marginTop: 10,
  },
  purple: {
      background: 'linear-gradient(45deg, #113C70, #3D0757)',
      color: grey[100],
      marginTop: 10
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  captcha: {
    marginTop: 50
  },
  link: {
    cursor: 'pointer',
    color: grey[100],
    fontSize: 14
  },
  terms: {
    color: grey[200],
    marginTop: 30,
    fontSize: 12
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
})
)

 function Signup(props){
  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const [loaded, setLoaded] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [captcha, setCaptcha] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [dialogText, setDialogText] = useState('')
  const [dialogTitle, setDialogTitle] = useState('')
  const [userErrMsg, setUserErrMsg] = useState('')
  const [passErrMsg, setPassErrMsg] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [userValue, setUserValue] = useState('')
  const [passValue, setPassValue] = useState('')

  const setLoading = (value) => {
    props.setLoading(value)
  }

  const checkEmail = (value) => {
    setEmailValue(value)
  }

  const checkUsername = (value) => {
    setUserValue(value)
    if(value.length < 6) {
      setUserErrMsg('Must input at least 6 characters')
      setUsernameError(true)
    } else if(value.length > 20) {
      setUserErrMsg('Must be less than 20 characters')
      setUsernameError(true)
    } else {
      // Auth.checkUser(value).then((data) => {
      //   const { isTaken } = data
      //   if(isTaken) {
      //     setUserErrMsg('Username already taken')
      //     setUsernameError(true)
      //   } else {
      //   }
      // })
      setUsernameError(false)
      setUserErrMsg('')
    }
  }

  const checkPassword = (value) => {
    setPassValue(value)
    if(value.length < 6) {
      setPassErrMsg('Must input at least 6 characters')
      setPassError(true)
    } else if(value.length > 30) {
      setPassErrMsg('Must be less than 30 characters')
      setPassError(true)
    } else {
      setPassError(false)
      setUserErrMsg('')
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const submitData = (e) => {
    setLoaded(true)
    e.preventDefault()
    if(!captcha){
      setDialogOpen(true)
      setDialogTitle('You Even A Human?')
      setDialogText("You didn't click the captcha button. Real quick click that so we know you're not a robot Beep Boop!")
      setLoaded(false)
    }
    else if(emailValue === '' && userValue === '' && passValue === '') {
      setDialogOpen(true)
      setDialogTitle('Hey Wait')
      setDialogText("You didn't even fill it out at all ya goof! Do us a solid and get that all filled out")
      setLoaded(false)
    } else if(emailValue === '') {
      setDialogOpen(true)
      setDialogTitle('Hey Wait')
      setDialogText("You didn't even fill out your email ya goof! Do us a solid and get that filled out")
      setLoaded(false)
    } else if(userValue === '') {
      setDialogOpen(true)
      setDialogTitle('Hey Wait')
      setDialogText("You didn't even fill out your username ya goof! Do us a solid and get that filled out")
      setLoaded(false)
    } else if(passValue === '') {
      setDialogOpen(true)
      setDialogTitle('Hey Wait')
      setDialogText("You didn't even fill out your password ya goof! Do us a solid and get that filled out")
      setLoaded(false)
    } else if(usernameError && passError) {
      setDialogOpen(true)
      setDialogTitle('Uh Oh')
      setDialogText("Looks like there's a tiny issue with your username and password. Do us a favor and give it a quick look over.")
      setLoaded(false)
    } else if(usernameError) {
      setDialogOpen(true)
      setDialogTitle('Uh Oh')
      setDialogText("Looks like there's a tiny issue with your username. Do us a favor and give it a quick look over.")
      setLoaded(false)
    } else if(passError) {
      setDialogOpen(true)
      setDialogTitle('Uh Oh')
      setDialogText("Looks like there's a tiny issue with your password. Do us a favor and give it a quick look over.")
      setLoaded(false)
    } else {
      const user = {username: userValue, password: passValue, email: emailValue, role: 'user', balance: '0'}
      // Auth.register(user).then((data) => {
        Auth.register(user).then((data) => {
            const { msgError, msgBody } = data.message
            if(!msgError){
              Auth.login(user).then((data) => {
                const { user, isAuthenticated, message } = data
                authContext.setUser(user)
                authContext.setNewUser(true)
                authContext.setIsAuthenticated(isAuthenticated)
                setLoaded(false)
                // if(isAuthenticated)
                // alert("Account successfully created and logged in")
              })
            } else 
            setDialogOpen(true)
            setDialogTitle('Uh Oh')
            setDialogText(msgBody)
            setLoaded(false)
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
      <Backdrop className={classes.backdrop} open={loaded}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <Typography variant="h4" className={classes.h4} align="center">
                Sign Up
              </Typography>
              <form onSubmit={(e) => {submitData(e)}}>
                <div>
                  <TextField 
                    id="standard-basic" 
                    label="Email"
                    type="email"
                    onInput={(e) => {checkEmail(e.target.value)}}
                    autoComplete="off"
                    className={classes.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth/>
                </div>
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
                    }}
                    fullWidth/>
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
                    }}
                    fullWidth/>
                </div>
                <div>
                  <Recaptcha 
                  theme="dark"
                  className={classes.captcha}
                  sitekey="6LdkJ_AZAAAAAGUkPA_fSKp1sivrStsrrZMJWynv"
                  onChange={() => {setCaptcha(true)}}
                  onExpired={() => {setCaptcha(false)}}
                  />
                </div>
                <div>
                  <Terms setOpen={setTermsOpen} open={termsOpen}/>
                  <Typography align="center" className={classes.terms}>By clicking SIGN UP you Agree to our</Typography>
                  <Typography align="center" className={classes.link} onClick={() => {setTermsOpen(true)}}>"Terms of Use" and "Privacy Policy"</Typography>
                </div>
                  <Button 
                    className={classes.button} 
                    variant="contained" 
                    type="submit"
                    fullWidth>
                      Sign Up
                  </Button>
              </form>
              <Typography type="subtitile1" align="center" className={classes.textField}>or</Typography>
              <Button
                    className={classes.purple} 
                    variant="contained" 
                    onClick={() => switchPanel()}
                    fullWidth>
                Log In
              </Button>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}

export default Signup;
