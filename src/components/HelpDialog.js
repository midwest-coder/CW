import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, makeStyles, Grid, Link } from '@material-ui/core'
import { Stepper, Step, StepLabel, Typography } from '@material-ui/core'


const useStyles = makeStyles({
})

function getSteps() {
  return ['Add credits to account', 'Download game', 'Transfer credits to crypto'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <Grid container>
                <Grid item xs={12} sm={4}>
                  <Typography >1. Our games require credits to play, so first you need to purchase credits</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography >2. Purchase credits by clicking transfer in the profile menu. Currently this action must be done on a computer</Typography>
                  </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography>3. Transfer for credits using DAI. Make sure to have Ether for gas and <Link href="https://metamask.io/" target="blank">Metamask Chrome extension</Link></Typography>
                  </Grid>
              </Grid>;
    case 1:
      return <Grid container>
                <Grid item xs={12} sm={4}>
                  <Typography >1.  You can find our titles at the bottom of the page, currently only with our debut title</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography >2. Click the download button to download the zipped game folder. Unzip the folder when done</Typography>
                  </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography >3. Open the unzipped folder and click on the application file with the name of the game</Typography>
                  </Grid>
              </Grid>;
    case 2:
      return <Grid container>
                <Grid item xs={12} sm={4}>
                  <Typography >1. Once you're ready to transfer your credits back click transfer in the profile menu</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography >2. Choose an amount to sell and that will be deducted from your credits and returned in DAI</Typography>
                  </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography >3. Check the abbreviated wallet address under the amount to make sure it's correct</Typography>
                  </Grid>
              </Grid>;
    default:
      return <React.Fragment>
              <Typography align="center">And that's all there is to it!</Typography>
            </React.Fragment>
      
  }
}

export default function HelpDialog(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  
  const handleDialogClose = () => {
    props.setOpen(false)
    setActiveStep(0);
    }

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
    
     return(
        <Dialog
        open={props.open}
        onClose={handleDialogClose}
        aria-labelledby="help-dialog-title"
        aria-describedby="help-dialog-description"
        >
        <DialogTitle id="help-dialog-title">
        <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
        </DialogTitle>
          <DialogContent>     
          {getStepContent(activeStep)}
          </DialogContent>
          <DialogActions>
          <div>
              {activeStep === steps.length ? (
                <div>
                  <Button onClick={handleReset}>See it Again</Button>
                </div>
              ) : (
                <div>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <Button onClick={handleDialogClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
      </Dialog>
     )
}
