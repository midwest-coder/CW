import React, { useState, useContext } from 'react'
import { Button, Card, Grid, Typography, Dialog, DialogTitle, DialogContent, 
    Box, DialogContentText, DialogActions, Tab, Tabs, TextField, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { grey, lightBlue, purple } from '@material-ui/core/colors'
import { AttachMoney, Face, MonetizationOn } from '@material-ui/icons'
import Web3 from 'web3'
import BSBack from '../abis/BSBack.json'
import DaiToken from '../abis/DaiToken.json'
import daiLogo from '../images/dai.png'
import Auth from '../services/Auth'
import { AuthContext } from '../context/AuthContext'
import HelpDialog from './HelpDialog'
import ProfileMenu from './ProfileMenu'

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
        background: 'black',
        marginTop: 5,
        marginBottom: 5,
        padding: 15
    },
    userBox: {
    },
    username: {
        color: grey[100],
        padding: 15
    },
    userText: {
        color: lightBlue[600],
        marginRight: 10,
    },
    coins: {
        color: purple[500]
    },
    transferButton: {
        background: 'linear-gradient(45deg, #32a883, #3290a8)',
        color: grey[100],
        marginRight: 15,
        marginLeft: 20

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
        marginRight: 15,
    },
    textField: {
      marginTop: 20,
    },
    daiLogo: {
      width: 20,
      height: 20,
    },
    a: {
        textDecoration: 'none'
    }
})

function ProfileBox(props) {
    const classes = useStyles()
    const { user,setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false)
    const [helpOpen, setHelpOpen] = useState(false)
    const [inputError, setInputError] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const dialogContent = ''
    const [tabValue, setTabValue] = useState(0);
    const [web3Loaded, setWeb3Loaded] = useState(true);
    const [buyAmount, setBuyAmount] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);
    const [account, setAccount] = useState('0')
    const [accountDisplay, setAccountDisplay] = useState('0')
    const [daiToken, setDaiToken] = useState({})
    const [bsBack, setBSBack] = useState({})
    const tokenAddress = ''
    const admin = '0x030a2fDC69431eD2b96E9651B0e10AD12a231638'

    const setLoading = (value) => {
      props.setLoading(value)
    }

    const setUsername = () => {
      if(user.username.length > 9)
        return user.username.slice(0,9) + "..."
        else
        return user.username
    }
  
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

      const openMenu = (event) => {
        setMenuOpen(event.currentTarget);
      };

      const openDialog = async () => {
        setMenuOpen(null);
        // try{
        //   await loadBlockchain()
        // } catch(Error) {
        //   setWeb3Loaded(false);
        // }
        // if(web3Loaded){
          setBuyAmount(0)
          setSellAmount(0)
          setDialogOpen(true)
        // }
      }

      const openHelp = () => {
        setMenuOpen(null);
        setHelpOpen(true)
      }

      const loadBlockchain = async () => {
        await loadWeb3()
        await loadBlockchainData()
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
          throw Error;
          alert('Must have metamask chrome extension and wallet loaded')
        }
      }

      const loadBlockchainData = async () => {
        const web3 = window.web3
    
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        setAccountDisplay(accounts[0].slice(0,6))
        
        const networkId = await web3.eth.net.getId()
        
        // Load DaiToken
        //address 0x15391726683672fe8102a406d44792C387E03dF5
        const daiTokenData = DaiToken.networks[networkId]
        if(daiTokenData) {
          const _daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
          setDaiToken(_daiToken)
          
        } else {
          alert('DaiToken contract not deployed to detected network.')
          throw Error;
        }
        
        // Load BSBack
        //address 0xe6b7E811690103db6CB3c02bfa097e57e6a3E41D
        const BSBackData = BSBack.networks[networkId]
        if(BSBackData) {
          const _bsBack = new web3.eth.Contract(BSBack.abi, BSBackData.address)
          setBSBack(_bsBack)
        } else {
          alert('Crypto Wars smart contract not deployed to detected network.')
          throw Error;
        }
      }

      const buyCoins = (e) => {
        e.preventDefault()
        setDialogOpen(false)
        setLoading(true)
        Auth.isAuthenticated().then((data) => {
          if(data.isAuthenticated){
            const balance = data.user.balance
            const amount = parseInt(balance) + parseInt(buyAmount)
            const tempUser = {username: data.user.username, role: data.user.role, matches: data.user.matches, balance: amount}
              // daiToken.methods.approve(bsBack._address, Web3.utils.toWei(buyAmount)).send({ from: account, gas: 500000 }).on('transactionHash', (hash) => {
              // bsBack.methods.buyCoins(daiToken._address, Web3.utils.toWei(buyAmount)).send({ from: account, gas: 500000 })
              //   .on('transactionHash', (hash) => {
              //     setLoading(false)
              //   })
              //   .on('receipt', (receipt) => {
                Auth.updateTokens(user, amount).then((data) => {
                  const { msgBody, msgError } = data.message
                  if(!msgError)
                    setUser(tempUser)
                  else
                    alert(msgBody)
                })
              }
          })
            //   })
            // })
          setLoading(false)
        // props.buyCoins(buyAmount)
      }

      const sellCoins = (e) => {
        e.preventDefault()
        setDialogOpen(false)
        const { balance } = user
        const amount = parseInt(balance) - parseInt(sellAmount)
        console.log(amount)
        if(amount >= 0) {
          setLoading(true)
          const tempUser = user
          const temBalance = balance
          tempUser.balance = amount
          Auth.updateTokens(user, amount).then((data) => {
            const { msgBody, msgError } = data.message
            // alert(Web3.utils.toWei(amount, "ether"))
            if(!msgError){
              // bsBack.methods.collectFunds(daiToken._address, account, sellAmount).send({ from: admin, gas: 500000 })
              //   .on('transactionHash', (hash) => {
              //       setLoading(false)
              //     })
              //     .on('receipt', (error, receipt) => {
              //       setUser(tempUser)
              //     })
              //     .on('error', (error, receipt) => {
              //       Auth.updateTokens(user, temBalance).then((data) => {
              //         const { msgBody, msgError } = data.message
              //         if(msgError)
              //           alert(msgBody)
              //         })
              //         // setUser(_user)
              //       })
            }
            else
              alert(msgBody)

              setLoading(false)
          })
            // props.sellCoins(sellAmount)
          } else {
            setLoading(false)
            alert("Cannot sell more credits than owned")
          }
          setLoading(false)
      }

      const logout = () => {
        setLoading(true)
        Auth.logout().then(() => {
          setUser({username: '', role: '', balance: ''})
          setIsAuthenticated(false)
        })
        setLoading(false)
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
                      if(value < 10){
                        setDisableButton(true)
                        setInputError(true)
                        setErrorMessage('Must buy at least 1 DAI worth')
                      }
                      else if(value % 10 != 0){
                        setDisableButton(true)
                        setInputError(true)
                        setErrorMessage('Must buy in whole DAI values')
                      }
                      else {
                        setDisableButton(false)
                        setInputError(false)
                        setErrorMessage('')
                        setBuyAmount(value)
                      }
                    }
                    else {
                      const balance = parseInt(user.balance)
                        if(value > balance){
                            setDisableButton(true)
                            setInputError(true)
                            setErrorMessage('Must have sufficient funds')
                        }
                        else if(value < 10){
                            setDisableButton(true)
                            setInputError(true)
                            setErrorMessage('Must sell at least 1 DAI worth')
                        }
                        else if(value % 10 != 0){
                          setDisableButton(true)
                          setInputError(true)
                          setErrorMessage('Must sell in whole DAI values')
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
                    <Typography type="subtitle1">Wallet: {accountDisplay}...</Typography>
                    
                    <Typography type="subtitile1" className={classes.textField}>
                        Cost:
                    </Typography>
                    <Typography type="subtitile1">
                      <img alt="dai-logo" src={daiLogo} className={classes.daiLogo} /> {buyAmount / 10}
                    </Typography>
                    <Typography type="subtitile1">
                        Recieve:
                    </Typography>
                    <Typography type="subtitile1">
                      <MonetizationOn className={classes.coins}/> {buyAmount}
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
                    <Typography type="subtitle1">Wallet: {accountDisplay}...</Typography>

                    <Typography type="subtitile1" className={classes.textField}>
                        Cost:
                    </Typography>
                    <Typography type="subtitile1">
                      <MonetizationOn className={classes.coins}/> {sellAmount}
                    </Typography>
                    <Typography type="subtitile1">
                        Recieve:
                    </Typography>
                    <Typography type="subtitile1">
                      <img alt="dai-logo" src={daiLogo} className={classes.daiLogo} /> {sellAmount / 10}
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
            <DialogActions>
              <Button onClick={handleDialogClose} className={classes.green}>
                Close
              </Button>
            </DialogActions>
        </Dialog>
        <HelpDialog open={helpOpen} setOpen={setHelpOpen} />
        <Card className={classes.card}>
                  <Typography variant="subtitle1" className={classes.coins} align="right">
                  <MonetizationOn /><span className={classes.username}>{user.balance}</span>
                    <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="contained"
                      className={classes.logout}
                      onClick={openMenu}
                    >
                    <Face className={classes.userText}/> {setUsername()}
                    </Button>
                    <ProfileMenu 
                      anchor={menuOpen} 
                      setOpen={setMenuOpen} 
                      onTransfer={openDialog} 
                      onHelp={openHelp} 
                      onLogout={logout}/>
                  {/* <Box display={{ xs: 'none', sm: 'inline' }}>
                  <Button
                    className={classes.transferButton}
                    variant="contained"
                    size="small"
                    onClick={() => openDialog()}
                    >    
                    <CompareArrows />
                  </Button>
                  </Box>
                    <Button
                      className={classes.logout}
                      variant="contained"
                      size="small"
                      onClick={() => logout()}>
                      <MeetingRoom />
                    </Button>
                    <Button
                      className={classes.logout}
                      variant="contained"
                      size="small"
                      onClick={openHelp}>
                        <QuestionAnswer />
                    </Button> */}
                  </Typography>
        </Card>
        </React.Fragment>
    )
}

export default ProfileBox
