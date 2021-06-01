import React, { useState, useContext, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, TextField, InputAdornment, Stepper, Step, StepLabel, Backdrop, CircularProgress, FormControl } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'
import Auth from '../services/Auth'
import { VpnKey } from '@material-ui/icons'

export default function VerifyEmailDialog(props) {
  const { user, setUser } = useContext(AuthContext)
  const [codeValue, setCodeValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    if(props.open && !emailSent) {
      sendEmail(user.email)
    }
    })

  const handleDialogClose = () => {
    setCodeValue('')
    props.setVerifyEmailDialogOpen(false)
    setEmailSent(false)
    setLoading(false)
    }
    const setAlert = (value) => {
      props.setAlert(value)
    }

    const sendEmail = (email) => {
        if(email === ''){
            setAlert({
              open:true,
              duration:6000,
              anchor:{
                vertical: 'top',
                horizontal: 'center',
              },
              message:"Invalid Verification Email. Must be logged in",
              action:false
            })
        } else {
            setLoading(true)
            setEmailSent(true)
            Auth.createCode({email: email, type: 'Email'}).then((data) => {
                setLoading(false)
                const { msgBody, msgError } = data
                if(!msgError) {
                  setAlert({
                    open:true,
                    duration:6000,
                    anchor:{
                      vertical: 'top',
                      horizontal: 'center',
                    },
                    message: msgBody,
                    action:false
                  })
                }
                else {
                  setAlert({
                    open:true,
                    duration:6000,
                    anchor:{
                      vertical: 'top',
                      horizontal: 'center',
                    },
                    message: msgBody,
                    action:false
                  })
                }
              })
            }
        }

    const verifyCode = (e) => {
        e.preventDefault()
        if(codeValue == ''){
            setAlert({
                open:true,
                duration:6000,
                anchor:{
                vertical: 'top',
                horizontal: 'center',
                },
                message:"You must enter a value in the code field",
                action:false
            })
        } else {
            setLoading(true)
            Auth.verifyCode({ email: user.email, type: 'Email', code: codeValue }).then((data) => {
                setLoading(false)
                const { msgBody, msgError } = data

                if(!msgError){
                    const tempUser = user
                    tempUser.emailVerified = !msgError
                    setUser(tempUser)
                }

                setAlert({
                    open:true,
                    duration:6000,
                    anchor:{
                    vertical: 'top',
                    horizontal: 'center',
                    },
                    message: msgBody,
                    action:false
                })
                handleDialogClose()
            })
        }
        }

    return(
    <React.Fragment>
        <Backdrop open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Dialog
            open={props.open}
            onClose={handleDialogClose}
            aria-labelledby="verify-email-dialog-title"
            aria-describedby="verify-email-dialog-description"
        >
        <DialogTitle id="password-reset-dialog-title">
            Verify Email
        </DialogTitle>
        <React.Fragment>
            <form onSubmit={(e) => {verifyCode(e)}}>
            <DialogContent>
                <Typography variant="subtitle1">Enter verification code</Typography>
                <FormControl fullWidth>
                <TextField
                id="standard-basic"
                value={codeValue}
                onInput={(e) => {setCodeValue(e.target.value)}}
                autoComplete="off"
                autoFocus
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <VpnKey />
                    </InputAdornment>
                    ),
                }}/>
                </FormControl>
                </DialogContent>
                <DialogActions>
                <Button type="submit" color="primary">
                    Enter
                </Button>
                <Button onClick={() => handleDialogClose()} color="primary">
                    Cancel
                </Button>
                </DialogActions>
            </form>
        </React.Fragment>
        </Dialog>
    </React.Fragment>
    )
}
