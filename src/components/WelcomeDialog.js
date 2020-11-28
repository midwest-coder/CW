import React, { useContext } from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'

// const useStyles = (theme) => makeStyles({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },

// });


export default function WelcomeDialog() {
  const authContext = useContext(AuthContext)
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    authContext.setNewUser(false)
    setOpen(false);
  };

  return (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="transfer-dialog-title"
          aria-describedby="transfer-dialog-description"
          >
          <DialogTitle id="transfer-dialog-title">
              <Typography variant="h6" align="center">Welcome!</Typography>
          </DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>
                Thanks
              </Button>
            </DialogActions>
        </Dialog>
  );
}
