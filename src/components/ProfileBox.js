import React, { useState, useContext } from 'react'
import { Button, Card, Grid, Typography, Dialog, DialogTitle, DialogContent, 
    Box, DialogContentText, DialogActions, Tab, Tabs, TextField, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { grey, lightBlue, purple } from '@material-ui/core/colors'
import { AttachMoney, CompareArrows, Face, MonetizationOn } from '@material-ui/icons'
import daiLogo from '../images/dai.png'
import Auth from '../services/Auth'
import { AuthContext } from '../context/AuthContext'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
    card: {
        marginTop: 30
    },
    userBox: {
        background: 'black',
        padding: 15
    },
    username: {
        color: grey[100],
        padding: 15
    },
    userText: {
        color: lightBlue[600],
        marginLeft: 10,
    },
    coins: {
        color: purple[500]
    },
    transferButton: {
        background: 'linear-gradient(45deg, #32a883, #3290a8)',
        color: grey[100]
    },
    button: {
        marginTop: 20,
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100]
    },
    green: {
        background: 'linear-gradient(45deg, #32a883, #3290a8)',
        color: grey[100]
    },
    purple: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100]
    },
    logout: {
        background: 'linear-gradient(45deg, #113C70, #3D0757)',
        color: grey[100],
        marginRight: 15
    },
    textField: {
      marginTop: 20,
    },
    daiLogo: {
      width: 20,
      height: 20,
    }
})

function ProfileBox() {
    const classes = useStyles()
    const { user,setUser, isAuthenticated, setIsAuthenticated, setIsLoaded } = useContext(AuthContext)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [inputError, setInputError] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const dialogContent = ''
    const [tabValue, setTabValue] = useState(0);
    const [buyAmount, setBuyAmount] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);
  
    const handleChange = (event, newValue) => {
        setBuyAmount(0)
        setSellAmount(0)
        setDisableButton(false)
        setInputError(false)
        setErrorMessage('')
      setTabValue(newValue)
    };
  
    const handleChangeIndex = (index) => {
      setTabValue(index)
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
      }

      const openDialog = () => {
        setBuyAmount(0)
        setSellAmount(0)
        setDialogOpen(true)
      }

      const buyCoins = (e) => {
        e.preventDefault()
        setDialogOpen(false)
        setIsLoaded(false)
        const { balance } = user
        const tempUser = user
        const amount = parseInt(balance) + parseInt(buyAmount)
        tempUser.balance = amount
        Auth.updateTokens(user, amount).then((data) => {
          const { msgBody, msgError } = data.message
          if(!msgError)
            setUser(tempUser)
          else
            alert(msgBody)

          setIsLoaded(true)
        })
        // props.buyCoins(buyAmount)
      }

      const sellCoins = (e) => {
        e.preventDefault()
        setDialogOpen(false)
        const { balance } = user
        const amount = parseInt(balance) - parseInt(sellAmount)
        console.log(amount)
        if(amount >= 0) {
          setIsLoaded(false)
          const tempUser = user
          tempUser.balance = amount
          Auth.updateTokens(user, amount).then((data) => {
            const { msgBody, msgError } = data.message
            if(!msgError)
            setUser(tempUser)
            else
            alert(msgBody)

            setIsLoaded(true)
          })
            // props.sellCoins(sellAmount)
          } else {
            alert("Cannot sell more credits than owned")
          }
      }

      const logout = () => {
        Auth.logout().then(() => {
          setUser({username: '', role: '', balance: ''})
          setIsAuthenticated(false)
        })
      }

      const checkInput = (value) => {
          if(isNumeric(value)){
              if(value <= 0)
                {
                    setDisableButton(true)
                    setInputError(true)
                    setErrorMessage('Must Be greater than zero')
                } else if(value % 1 !== 0) {
                    setDisableButton(true)
                    setInputError(true)
                    setErrorMessage('Must be a whole number')
                }
                else {
                    if(tabValue === 0) {
                        setDisableButton(false)
                        setInputError(false)
                        setErrorMessage('')
                        setBuyAmount(value)
                    }
                    else {
                      const balance = parseInt(user.balance)
                        if(value > balance){
                            setDisableButton(true)
                            setInputError(true)
                            setErrorMessage('Must have sufficient funds')
                        }
                        else {
                            setDisableButton(false)
                            setInputError(false)
                            setErrorMessage('')
                            setSellAmount(value)
                        }
                    } 
                }
          } 
          else {
            setDisableButton(true)
            setInputError(true)
            setErrorMessage('Only use numbers please')
          }
          if(value === '') {
            setDisableButton(false)
            setInputError(false)
            setErrorMessage('')
            setSellAmount(0)
            setBuyAmount(0)
          }
      }

      const isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

    return(
        <React.Fragment>
            <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="transfer-dialog-title"
          aria-describedby="transfer-dialog-description"
          >
          <DialogTitle id="transfer-dialog-title">
            <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            centered
            >
            <Tab label="Buy" {...a11yProps(0)} />
            <Tab label="Sell" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <form onSubmit={(e) => {buyCoins(e)}}>
                  <TextField
                    fullWidth
                    id="buy-amount" 
                    label="Amount"
                    type="text"
                    helperText={errorMessage}
                    error={inputError}
                    onInput={(e) => {checkInput(e.target.value)}}
                    autoComplete="off"
                    className={classes.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoney />
                        </InputAdornment>
                      ),
                    }}/>
                    
                    <Typography type="subtitile1" className={classes.textField}>
                        Cost: <img alt="dai-logo" src={daiLogo} className={classes.daiLogo} /> {buyAmount}
                    </Typography>
                    <Typography type="subtitile1">
                        Recieve: <MonetizationOn className={classes.coins}/> {buyAmount}
                    </Typography>
                  <Button 
                    className={classes.button} 
                    variant="contained" 
                    type="submit"
                    disabled={disableButton}
                    fullWidth>
                    Buy
                  </Button>
              </form>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <form onSubmit={(e) => {sellCoins(e)}}>
                  <TextField
                    fullWidth
                    id="sell-amount" 
                    label="Amount"
                    type="text"
                    helperText={errorMessage}
                    error={inputError}
                    onInput={(e) => {checkInput(e.target.value)}}
                    autoComplete="off"
                    className={classes.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        <AttachMoney />
                        </InputAdornment>
                      ),
                    }}/>
                    <Typography type="subtitile1" className={classes.textField}>
                        Cost: <MonetizationOn className={classes.coins} /> {sellAmount}
                    </Typography>
                    <Typography type="subtitile1">
                        Recieve: <img alt="dai-logo" src={daiLogo} className={classes.daiLogo} /> {sellAmount}
                    </Typography>
                  <Button 
                    className={classes.button} 
                    variant="contained" 
                    type="submit"
                    disabled={disableButton}
                    fullWidth>
                    Sell
                  </Button>
              </form>
            </TabPanel>
          </DialogTitle>
            <DialogContent>
              <DialogContentText id="transfer-dialog-description">
                  {dialogContent}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} className={classes.green}>
                Cancel
              </Button>
            </DialogActions>
        </Dialog>
        <Card className={classes.card}>
            <Grid container>
                <Grid item xs={6} className={classes.userBox}>
                    <Typography variant="subtitle1" className={classes.userText} align="left">
                    <Button
                    className={classes.logout}
                    variant="contained"
                    onClick={() => logout()}>
                      logout
                    </Button>
                    <Face /><span className={classes.username}>{user.username}</span>
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.userBox}>
                    <Typography variant="subtitle1" className={classes.coins} align="right">
                    <MonetizationOn /><span className={classes.username}>{user.balance}</span>
                    <Button
                    className={classes.transferButton}
                    variant="contained"
                    onClick={() => openDialog()}
                    >    
                        <CompareArrows />
                    </Button>
                    </Typography>
                </Grid>
            </Grid>
        </Card>
        </React.Fragment>
    )
}

export default ProfileBox
