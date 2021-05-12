import React, { useState, useContext } from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, TextField, InputAdornment } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'
import Auth from '../services/Auth'
import { LockOpen } from '@material-ui/icons'

export default function PasswordDialog(props) {
  const { user } = useContext(AuthContext)
  const [passValue, setPassValue] = useState('')
  
  const handleDialogClose = () => {
    props.setPasswordDialogOpen(false)
    }
    const setLoading = (value) => {
      props.setLoading(value)
    }    
    const setAlert = (value) => {
      props.setAlert(value)
    }

    const keyPress = (e) =>{
       if(e.keyCode == 13){
         checkPassword()
       }
    }

    const checkPassword = () => {
        if(passValue == ''){
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
            const userCheck = {username: user.username, password: passValue}
            Auth.checkPassword(userCheck).then((data) => {
                setLoading(false)
                const { info } = data
                if(info !== null) 
                  props.setVerified(true)
                else {
                  props.setVerified(false)
                  setAlert({
                    open:true,
                    duration:6000,
                    anchor:{
                      vertical: 'top',
                      horizontal: 'center',
                    },
                    message:"The password you entered was not correct",
                    action:false
                  })
                }

              })
            setPassValue('')
            handleDialogClose()
            }
        }
        
     return(
        <Dialog
            open={props.open}
            onClose={handleDialogClose}
            aria-labelledby="password-dialog-title"
            aria-describedby="password-dialog-description"
        >
        <DialogTitle id="password-dialog-title">
            Password Verification
        </DialogTitle>
          <DialogContent>
                  <Typography variant="subtitle1">Verify your password before you can make account updates</Typography>
                  <TextField 
                    id="standard-basic" 
                    label="Password"
                    type="password"
                    onInput={(e) => {setPassValue(e.target.value)}}
                    onKeyUp={(e) => {keyPress(e)}}
                    autoComplete="off"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                            <LockOpen />
                        </InputAdornment>
                      ),
                    }}/>
          </DialogContent>
          <DialogActions>
          <Button onClick={checkPassword} color="primary">
              Enter
            </Button>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
      </Dialog>
     )
}
