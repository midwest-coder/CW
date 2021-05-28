import React, { useState, useContext, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, TextField, InputAdornment, Stepper, Step, StepLabel, Grid, FormControl } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'
import Auth from '../services/Auth'
import { Email, VpnKey, Lock } from '@material-ui/icons'

function getSteps() {
  return ['Enter Email', 'Enter Code', 'Change Password'];
}

export default function PassResetDialog(props) {
  const { user } = useContext(AuthContext)
  const [emailValue, setEmailValue] = useState('')
  const [codeValue, setCodeValue] = useState('')
  const [passValue, setPassValue] = useState('')
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  
  useEffect(() => {
    if(user.email && props.open && activeStep === 0) {
      setEmailValue(user.email)
      sendEmail(user.email)
      setActiveStep(1)
    }
    })

    const handleReset = () => {
      setActiveStep(0);
    }
  
  const handleDialogClose = () => {
    setEmailValue('')
    setCodeValue('')
    setPassValue('')
    props.setPassResetDialogOpen(false)
    handleReset()
    setLoading(false)
    }
    const setLoading = (value) => {
      props.setLoading(value)
    }    
    const setAlert = (value) => {
      props.setAlert(value)
    }

    const sendEmail = (email) => {
        if(email == ''){
            setAlert({
              open:true,
              duration:6000,
              anchor:{
                vertical: 'top',
                horizontal: 'center',
              },
              message:"You must enter a value in the email field",
              action:false
            })
        } else {
            setLoading(true)
            Auth.initiatePassReset({email: email}).then((data) => {
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
                  setActiveStep(1)
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
                Auth.verifyCode({ email: emailValue, code: codeValue }).then((data) => {
                    setLoading(false)
                    const { msgBody, msgError } = data
                    
                    if(!msgError) {
                      setActiveStep(2)
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
                })
            }
          }

            const changePassword = (e) => {
              e.preventDefault()
                if(codeValue == ''){
                    setAlert({
                      open:true,
                      duration:6000,
                      anchor:{
                        vertical: 'top',
                        horizontal: 'center',
                      },
                      message:"You must enter a value in the password field",
                      action:false
                    })
                } else {
                    setLoading(true)
                    Auth.updatePassword({email: emailValue, pass: passValue}).then((data) => {
                        setLoading(false)
                        const { msgBody } = data
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

        
        function getStepContent(stepIndex) {
          switch (stepIndex) {
            case 0:
              return <React.Fragment>
                 <form onSubmit={(e) => {
                  e.preventDefault()
                   sendEmail(emailValue)}}>
                  <DialogContent>
                    <Typography variant="subtitle1">Enter your account email</Typography>
                    <FormControl fullWidth>
                    <TextField
                      id="standard-basic"
                      type="email"
                      value={emailValue}
                      onInput={(e) => {setEmailValue(e.target.value)}}
                      autoComplete="off"
                      autoFocus
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                              <Email />
                          </InputAdornment>
                        ),
                      }}/>
                    </FormControl>
                    </DialogContent>
                    <DialogActions>
                    <Button type="submit" color="primary">
                        Enter
                      </Button>
                      <Button onClick={handleDialogClose} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </form>
              </React.Fragment>
            case 1:
              return <React.Fragment>
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
                   <Button onClick={handleDialogClose} color="primary">
                     Cancel
                   </Button>
                 </DialogActions>
               </form>
           </React.Fragment>
            case 2:
              return <React.Fragment>
              <form onSubmit={(e) => {changePassword(e)}}>
               <DialogContent>
                 <Typography variant="subtitle1">Enter your new password</Typography>
                 <FormControl fullWidth>
                 <TextField
                   id="standard-basic"
                   type="password"
                   value={passValue}
                   onInput={(e) => {setPassValue(e.target.value)}}
                   autoComplete="off"
                   autoFocus
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start">
                           <Lock />
                       </InputAdornment>
                     ),
                   }}/>
                 </FormControl>
                 </DialogContent>
                 <DialogActions>
                 <Button type="submit" color="primary">
                     Enter
                   </Button>
                   <Button onClick={handleDialogClose} color="primary">
                     Cancel
                   </Button>
                 </DialogActions>
               </form>
           </React.Fragment>
            default:
              return <React.Fragment>
              <form onSubmit={(e) => {sendEmail(e)}}>
               <DialogContent>
                 <Typography variant="subtitle1">Enter your account email</Typography>
                 <FormControl fullWidth>
                 <TextField
                   id="standard-basic" 
                   label="Email"
                   type="email"
                   onInput={(e) => {setEmailValue(e.target.value)}}
                   autoComplete="off"
                   autoFocus
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start">
                           <Email />
                       </InputAdornment>
                     ),
                   }}/>
                 </FormControl>
                 </DialogContent>
                 <DialogActions>
                 <Button type="submit" color="primary">
                     Enter
                   </Button>
                   <Button onClick={handleDialogClose} color="primary">
                     Cancel
                   </Button>
                 </DialogActions>
               </form>
           </React.Fragment>
              
          }
        }

     return(
        <Dialog
            open={props.open}
            onClose={handleDialogClose}
            aria-labelledby="password-reset-dialog-title"
            aria-describedby="password-reset-dialog-description"
        >
        <DialogTitle id="password-reset-dialog-title">
          <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        </DialogTitle>
          {getStepContent(activeStep)}
      </Dialog>
     )
}
