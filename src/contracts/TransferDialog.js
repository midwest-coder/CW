// import React, { useState, useContext } from 'react'
// import { Button, Typography, Dialog, DialogTitle, DialogContent, 
//     Box, DialogContentText, DialogActions, Tab, Tabs, TextField, InputAdornment } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
// import PropTypes from 'prop-types';
// import { grey, lightBlue, purple } from '@material-ui/core/colors'
// import { AttachMoney, MonetizationOn } from '@material-ui/icons'
// import Web3 from 'web3'
// import BSBack from '../abis/BSBack.json'
// import DaiToken from '../abis/DaiToken.json'
// import daiLogo from '../images/dai.png'
// import Auth from '../services/Auth'
// import { AuthContext } from '../context/AuthContext'

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;
  
//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`scrollable-auto-tabpanel-${index}`}
//         aria-labelledby={`scrollable-auto-tab-${index}`}
//         {...other}
//       >
//         {value === index && (
//           <Box p={3}>
//             <Typography>{children}</Typography>
//           </Box>
//         )}
//       </div>
//     );
//   }
  
//   TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
//   };
  
//   function a11yProps(index) {
//     return {
//       id: `scrollable-auto-tab-${index}`,
//       'aria-controls': `scrollable-auto-tabpanel-${index}`,
//     };
//   }

  
// const useStyles = makeStyles({
//     card: {
//         marginTop: 30
//     },
//     userBox: {
//         background: 'black',
//         padding: 15
//     },
//     username: {
//         color: grey[100],
//         padding: 15
//     },
//     userText: {
//         color: lightBlue[600],
//         marginLeft: 10,
//     },
//     coins: {
//         color: purple[500]
//     },
//     transferButton: {
//         background: 'linear-gradient(45deg, #32a883, #3290a8)',
//         color: grey[100],
//         marginRight: 15,
//         marginLeft: 20

//     },
//     button: {
//         marginTop: 20,
//         background: 'linear-gradient(45deg, #113C70, #3D0757)',
//         color: grey[100]
//     },
//     green: {
//         background: 'linear-gradient(45deg, #32a883, #3290a8)',
//         color: grey[100]
//     },
//     purple: {
//         background: 'linear-gradient(45deg, #113C70, #3D0757)',
//         color: grey[100]
//     },
//     logout: {
//         background: 'linear-gradient(45deg, #113C70, #3D0757)',
//         color: grey[100],
//         marginRight: 15
//     },
//     textField: {
//       marginTop: 20,
//     },
//     daiLogo: {
//       width: 20,
//       height: 20,
//     }
// })

// const TransferDialog = (props) => {
//     const classes = useStyles()
//     const { user,setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
//     const [inputError, setInputError] = useState(false)
//     const [disableButton, setDisableButton] = useState(false)
//     const [errorMessage, setErrorMessage] = useState('')
//     const dialogContent = ''
//     const [tabValue, setTabValue] = useState(0);
//     const [buyAmount, setBuyAmount] = useState(0);
//     const [sellAmount, setSellAmount] = useState(0);
//     const [account, setAccount] = useState('0')
//     const [accountDisplay, setAccountDisplay] = useState('0')
//     const [daiToken, setDaiToken] = useState({})
//     const [bsBack, setBSBack] = useState({})
//     const [dialogOpen, setDialogOpen] = useState(false)
//     const admin = '0x030a2fDC69431eD2b96E9651B0e10AD12a231638'


// const handleChange = (event, newValue) => {
//     setBuyAmount(0)
//     setSellAmount(0)
//     setDisableButton(false)
//     setInputError(false)
//     setErrorMessage('')
//   setTabValue(newValue)
// };

//   const handleChangeIndex = (index) => {
//     setTabValue(index)
//   }

//   const handleDialogClose = () => {
//       props.close()
//     }

//     const openDialog = async () => {
//       await loadBlockchain()
//       setBuyAmount(0)
//       setSellAmount(0)
//       setDialogOpen(true)
//     }

//     const loadBlockchain = async () => {
//       await loadWeb3()
//       await loadBlockchainData()
//     }
    
//     const setLoading = (value) => {
//         props.setLoading(value)
//       }

//     const loadWeb3 = async () => {
//       if (window.ethereum) {
//         window.web3 = new Web3(window.ethereum)
//         await window.ethereum.enable()
//       }
//       else if (window.web3) {
//         window.web3 = new Web3(window.web3.currentProvider)
//       }
//       else {
//         window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
//       }
//     }

//     const loadBlockchainData = async () => {
//       const web3 = window.web3
  
//       const accounts = await web3.eth.getAccounts()
//       setAccount(accounts[0])
//       setAccountDisplay(accounts[0].slice(0,6))
      
//       const networkId = await web3.eth.net.getId()
      
//       // Load DaiToken
//       //address 0x15391726683672fe8102a406d44792C387E03dF5
//       const daiTokenData = DaiToken.networks[networkId]
//       if(daiTokenData) {
//         const _daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
//         setDaiToken(_daiToken)
        
//       } else {
//         alert('DaiToken contract not deployed to detected network.')
//       }
      
//       // Load BSBack
//       //address 0xe6b7E811690103db6CB3c02bfa097e57e6a3E41D
//       const BSBackData = BSBack.networks[networkId]
//       if(BSBackData) {
//         const _bsBack = new web3.eth.Contract(BSBack.abi, BSBackData.address)
//         setBSBack(_bsBack)
//       } else {
//         alert('Crypto Wars smart contract not deployed to detected network.')
//       }
//     }

//     const buyCoins = (e) => {
//       e.preventDefault()
//       setDialogOpen(false)
//       setLoading(true)
//       const { balance } = user
//       const amount = parseInt(balance) + parseInt(buyAmount)
//       const tempUser = {username: user.username, role: user.role, balance: amount}
//           // daiToken.methods.approve(bsBack._address, Web3.utils.toWei(buyAmount)).send({ from: account, gas: 500000 }).on('transactionHash', (hash) => {
//           // bsBack.methods.buyCoins(daiToken._address, Web3.utils.toWei(buyAmount)).send({ from: account, gas: 500000 })
//           //   .on('transactionHash', (hash) => {
//           //     setLoading(false)
//           //   })
//           //   .on('receipt', (receipt) => {
//               Auth.updateTokens(user, amount).then((data) => {
//                 const { msgBody, msgError } = data.message
//                 if(!msgError)
//                   setUser(tempUser)
//                 else
//                   alert(msgBody)
//               })
//           //   })
//           // })
//         setLoading(false)
//       // props.buyCoins(buyAmount)
//     }

//     const sellCoins = (e) => {
//       e.preventDefault()
//       setDialogOpen(false)
//       const { balance } = user
//       const amount = parseInt(balance) - parseInt(sellAmount)
//       console.log(amount)
//       if(amount >= 0) {
//         setLoading(true)
//         const tempUser = user
//         const temBalance = balance
//         tempUser.balance = amount
//         Auth.updateTokens(user, amount).then((data) => {
//           const { msgBody, msgError } = data.message
//           alert(Web3.utils.toWei(amount, "ether"))
//           if(!msgError){
//             bsBack.methods.collectFunds(daiToken._address, account, sellAmount).send({ from: admin, gas: 500000 })
//               .on('transactionHash', (hash) => {
//                   setLoading(false)
//                 })
//                 .on('receipt', (error, receipt) => {
//                   setUser(tempUser)
//                 })
//                 .on('error', (error, receipt) => {
//                   Auth.updateTokens(user, temBalance).then((data) => {
//                     const { msgBody, msgError } = data.message
//                     if(msgError)
//                       alert(msgBody)
//                     })
//                     // setUser(_user)
//                   })
//           }
//           else
//             alert(msgBody)

//             setLoading(false)
//         })
//           // props.sellCoins(sellAmount)
//         } else {
//           setLoading(false)
//           alert("Cannot sell more credits than owned")
//         }
//         setLoading(false)
//     }

//       const checkInput = (value) => {
//         if(isNumeric(value)){
//             if(value <= 0)
//               {
//                   setDisableButton(true)
//                   setInputError(true)
//                   setErrorMessage('Must Be greater than zero')
//               } else if(value % 1 !== 0) {
//                   setDisableButton(true)
//                   setInputError(true)
//                   setErrorMessage('Must be a whole number')
//               }
//               else {
//                   if(tabValue === 0) {
//                       setDisableButton(false)
//                       setInputError(false)
//                       setErrorMessage('')
//                       setBuyAmount(value)
//                   }
//                   else {
//                     const balance = parseInt(user.balance)
//                       if(value > balance){
//                           setDisableButton(true)
//                           setInputError(true)
//                           setErrorMessage('Must have sufficient funds')
//                       }
//                       else {
//                           setDisableButton(false)
//                           setInputError(false)
//                           setErrorMessage('')
//                           setSellAmount(value)
//                       }
//                   } 
//               }
//         } 
//         else {
//           setDisableButton(true)
//           setInputError(true)
//           setErrorMessage('Only use numbers please')
//         }
//         if(value === '') {
//           setDisableButton(false)
//           setInputError(false)
//           setErrorMessage('')
//           setSellAmount(0)
//           setBuyAmount(0)
//         }
//     }

//     const isNumeric = (n) => {
//       return !isNaN(parseFloat(n)) && isFinite(n);
//     }

// return(
//         <Dialog
//             open={dialogOpen}
//             onClose={handleDialogClose}
//             aria-labelledby="transfer-dialog-title"
//             aria-describedby="transfer-dialog-description"
//             >
//             <DialogTitle id="transfer-dialog-title">
//             <Tabs
//             value={tabValue}
//             onChange={handleChange}
//             indicatorColor="primary"
//             textColor="primary"
//             variant="scrollable"
//             scrollButtons="auto"
//             aria-label="scrollable auto tabs example"
//             centered
//             >
//             <Tab label="Buy" {...a11yProps(0)} />
//             <Tab label="Sell" {...a11yProps(1)} />
//             </Tabs>
//             <TabPanel value={tabValue} index={0}>
//             <form onSubmit={(e) => {buyCoins(e)}}>
//                 <TextField
//                     fullWidth
//                     id="buy-amount" 
//                     label="Amount"
//                     type="text"
//                     helperText={errorMessage}
//                     error={inputError}
//                     onInput={(e) => {checkInput(e.target.value)}}
//                     autoComplete="off"
//                     className={classes.textField}
//                     InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                         <AttachMoney />
//                         </InputAdornment>
//                     ),
//                     }}/>
//                     <Typography type="subtitle1">Address: {accountDisplay}...</Typography>
                    
//                     <Typography type="subtitile1" className={classes.textField}>
//                         Cost:
//                     </Typography>
//                     <Typography type="subtitile1">
//                     <img alt="dai-logo" src={daiLogo} className={classes.daiLogo} /> {buyAmount}
//                     </Typography>
//                     <Typography type="subtitile1">
//                         Recieve:
//                     </Typography>
//                     <Typography type="subtitile1">
//                     <MonetizationOn className={classes.coins}/> {buyAmount}
//                     </Typography>
//                 <Button 
//                     className={classes.button} 
//                     variant="contained" 
//                     type="submit"
//                     disabled={disableButton}
//                     fullWidth>
//                     Buy
//                 </Button>
//             </form>
//             </TabPanel>
//             <TabPanel value={tabValue} index={1}>
//             <form onSubmit={(e) => {sellCoins(e)}}>
//                 <TextField
//                     fullWidth
//                     id="sell-amount" 
//                     label="Amount"
//                     type="text"
//                     helperText={errorMessage}
//                     error={inputError}
//                     onInput={(e) => {checkInput(e.target.value)}}
//                     autoComplete="off"
//                     className={classes.textField}
//                     InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                         <AttachMoney />
//                         </InputAdornment>
//                     ),
//                     }}/>
//                     <Typography type="subtitle1">Address: {accountDisplay}...</Typography>

//                     <Typography type="subtitile1" className={classes.textField}>
//                         Cost:
//                     </Typography>
//                     <Typography type="subtitile1">
//                     <MonetizationOn className={classes.coins}/> {sellAmount}
//                     </Typography>
//                     <Typography type="subtitile1">
//                         Recieve:
//                     </Typography>
//                     <Typography type="subtitile1">
//                     <img alt="dai-logo" src={daiLogo} className={classes.daiLogo} /> {sellAmount}
//                     </Typography>
//                 <Button 
//                     className={classes.button} 
//                     variant="contained" 
//                     type="submit"
//                     disabled={disableButton}
//                     fullWidth>
//                     Sell
//                 </Button>
//             </form>
//             </TabPanel>
//             </DialogTitle>
//             <DialogContent>
//             <DialogContentText id="transfer-dialog-description">
//                 {dialogContent}
//             </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//             <Button onClick={handleDialogClose} className={classes.green}>
//                 Close
//             </Button>
//             </DialogActions>
//         </Dialog>
//         )
// }

// export default TransferDialog