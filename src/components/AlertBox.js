import React, { useContext } from 'react'
import { Snackbar, Button, IconButton } from '@material-ui/core'
import { grey, lightBlue } from '@material-ui/core/colors'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from '../context/AuthContext'
import Web3 from 'web3'


const useStyles = makeStyles({
    snackbar: {
        maxWidth: 500,
    },
    close: {
        color: lightBlue[500]
    },
    green: {
        background: 'linear-gradient(45deg, #32a883, #3290a8)',
        color: grey[100]
    },
    purple: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100]
    },
})

function AlertBox(props) {
    const { web3, setWeb3 } = useContext(AuthContext)
    const classes = useStyles()
    
    const handleClose = (event, reason) => {
        props.setAlert({open:false,anchor:props.alert.anchor,message:props.alert.message,icon:props.alert.icon})
    }

    const additionalAction = () => {
        let button
        switch(props.alert.actionType){
            case 'Metamask':
                button = <Button variant="contained" color="primary"  className={classes.purple} size="small" onClick={openMetamask}>
                Download Metamask
              </Button>
            break;
            case 'Matic':
                button = <Button variant="contained" color="primary"  className={classes.green} size="small" onClick={switchToMatic}>
                Switch To Matic
              </Button>
            break;
        }
        return props.alert.action ? button : ''
    }

    const loadWeb3 = async () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
        }
    }

    const openMetamask = () => {
        handleClose()
        window.open('https://metamask.io/', '_blank')
        // window.location.href = 'https://metamask.io/'
    }

    const switchToMatic = async () => {
        await loadWeb3()
        const web3 = window.web3
        web3.currentProvider.chainId = '0x89'
        console.log(web3.currentProvider.chainId)
        // web3.setProvider('https://rpc-mainnet.matic.network')
        handleClose()
        // window.location.href = 'https://metamask.io/'
    }
      
  return (
    <Snackbar 
      className={classes.snackbar}
      open={props.alert.open} 
      autoHideDuration={props.alert.duration} 
      onClose={handleClose}
      anchorOrigin={props.alert.anchor}
      message={props.alert.message}
      action={
        <React.Fragment>
            {additionalAction()}
          <IconButton size="small" aria-label="close" color="primary" className={classes.close} onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }>
    </Snackbar>
  );
}

export default AlertBox;
