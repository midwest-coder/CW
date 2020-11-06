import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'


function HelpDialog() {
     return(
        <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="help-dialog-title"
        aria-describedby="help-dialog-description"
        >
        <DialogTitle id="help-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="help-dialog-description">
              {dialogText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
      </Dialog>
     )
}

export default HelpDialog;