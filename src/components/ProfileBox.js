import React, { useState, useContext } from 'react'
import { Button, Card, Grid, Typography, Dialog, DialogTitle, Chip, 
    Box, DialogActions, Tab, Tabs, TextField, InputAdornment } from '@material-ui/core'
import HDWalletProvider from '@truffle/hdwallet-provider'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { grey, lightBlue, purple } from '@material-ui/core/colors'
import { AttachMoney, Face, MonetizationOn, } from '@material-ui/icons'
import Web3 from 'web3'
import daiLogo from '../images/dai.png'
import Auth from '../services/Auth'
import { AuthContext } from '../context/AuthContext'
import HelpDialog from './HelpDialog'
import ProfileMenu from './ProfileMenu'
// import BN from 'bignumber.js'
require('dotenv').config()


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
    chip: {
      marginTop: 5
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
    const { user,setUser, isAuthenticated, setIsAuthenticated, web3, setWeb3 } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [helpOpen, setHelpOpen] = useState(false)
    const [inputError, setInputError] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [tabValue, setTabValue] = useState(0)
    // const [web3Loaded, setWeb3Loaded] = useState(true)
    // const [siteAccount, setSiteAccount] = useState(true)
    const [buyAmount, setBuyAmount] = useState(0)
    const [sellAmount, setSellAmount] = useState(0)
    // const [matic , setMatic] = useState({})
    const [account, setAccount] = useState('0')
    const [accountDisplay, setAccountDisplay] = useState('0')
    const [daiToken, setDaiToken] = useState({})
    const [cbBack, setCBBack] = useState({})

    const setLoading = (value) => {
      props.setLoading(value)
    }
    const setAlert = (value) => {
      props.setAlert(value)
    }
    const setProfileOpen = (value) => {
      props.setProfileOpen(value)
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

      const checkTransactions = async () => {
        await Auth.getTransactions().then((data) => {
          const { transactions } = data
          if(transactions === 0){
            const trans = transactions.reverse()
            if(trans[0].status === 'Initiated' || trans[0].status === 'Processing') {
              setAlert({
                open:true,
                duration:6000,
                anchor:{
                  vertical: 'top',
                  horizontal: 'center',
                },
                message:"You currently have a transaction processing. Wait just a few minutes before giving it another try",
                action:false,
                actionType:"Metamask"
              })
                throw Error
            }
          }
        })
      }

      const updateBalance = async () => {
        await Auth.getUser().then((data) => {
          const { balance } = data.user
          const tempUser = user
          tempUser.balance = balance
          setUser(tempUser)
        })
      }

      const openDialog = async () => {
        let loaded = true
        setMenuOpen(null)
        console.log(user.emailVerified)
        if(!user.emailVerified)
          setAlert({
            open:true,
            duration:6000,
            anchor:{
              vertical: 'top',
              horizontal: 'center',
            },
            message:"In order to make a transaction your email must be verified. Go to your profile page and click the verify email button",
            action:false,
            actionType:"Metamask"
          })
        else {
          try{
            await checkTransactions()
            await loadBlockchain()
          } catch(error) {
            loaded = false
          }
          if(loaded){
            await updateBalance()
            setBuyAmount(0)
            setSellAmount(0)
            setDialogOpen(true)
          }
        }
      }

      const openHelp = () => {
        setMenuOpen(null);
        setHelpOpen(true)
      }

      const openProfile = () => {
        setMenuOpen(null);
        setProfileOpen(true)
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
          setAlert({
            open:true,
            duration:6000,
            anchor:{
              vertical: 'top',
              horizontal: 'center',
            },
            message:"Looks like we couldn't find Metamask on your computer. Do us a favor and get that installed to your chrome browser",
            action:true,
            actionType:"Metamask"
          })
            // <ErrorAlert duration={20000}>
            //   <p>Download Metamask and connect your wallet</p>
            // </ErrorAlert>
            throw Error
          }
      }

      const loadBlockchainData = async () => {
        const userWeb3 = window.web3
        setWeb3(userWeb3)
        console.log(userWeb3)
        // setSiteAccount(siteWeb3)
        
        const accounts = await userWeb3.eth.getAccounts()
        setAccount(accounts[0])
        
        const hash = `${accounts[0].slice(0,6)}...${accounts[0].slice(accounts[0].length - 4,accounts[0].length)}`
        setAccountDisplay(hash)
 
        
        const networkId = await userWeb3.eth.net.getId()
        
        if(networkId == 137){       

          try{
            const DAI_TOKEN_ABI = [{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
            const DAI_TOKEN_ADDRESS = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
            const DAI_TOKEN = new userWeb3.eth.Contract(DAI_TOKEN_ABI, DAI_TOKEN_ADDRESS)
            setDaiToken(DAI_TOKEN)
          }
          catch( error) {
            alert(error.message)
          }
            
          try{
            const CB_BACK_ABI = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
            const CB_BACK_ADDRESS = "0x8911E044cF5652e7d1D05D85346a6F1e343F5379"
            const CB_BACK = new userWeb3.eth.Contract(CB_BACK_ABI, CB_BACK_ADDRESS)
            setCBBack(CB_BACK)
          }
          catch(error) {
            alert(error.message)
          }
        } else {
          setAlert({
            open:true,
            duration:20000,
            anchor:{
              vertical: 'top',
              horizontal: 'center',
            },
            message:"We use the Matic Network for our platform. Switch your network to continue",
            action:false,
            actionType:"Matic"
          })
          throw Error
          // const open = true;
          // const duration = 20000;
          // throw Error;
        }
      }

      const buyCoins = (e) => {
        e.preventDefault()
        if(parseInt(buyAmount) <= 0 || buyAmount === null){
          setAlert({
            open:true,
            duration:6000,
            anchor:{
              vertical: 'top',
              horizontal: 'center',
            },
            message:"You must enter a valid value",
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
              message:"Make sure you don't refresh the page as it may result in a loss of crypto",
              action:false
            })
            setDialogOpen(false)
            setLoading(true)
            Auth.isAuthenticated().then((data) => {
              if(data.isAuthenticated){
                const balance = data.user.balance
                const amount = parseInt(balance) + parseInt(buyAmount)
                const tokenAmount = web3.utils.toWei((buyAmount / 10).toString(), 'ether')
                const SITE_ADDRESS = "0x1674c5B65e4a1e715bfEb66B4D50f4001b551799"
                const tempUser = data.user
                tempUser.balance = amount
                let transHash = '0'
                let status = 'Processing'
                let info = {type: 'Buy',amount: buyAmount}
                Auth.createTransaction(info).then((data) => {
                  const { msgBody, msgError } = data
                  if(msgError){
                    setAlert({
                      open:true,
                      duration:20000,
                      anchor:{
                        vertical: 'top',
                        horizontal: 'left',
                      },
                      message:msgBody,
                      action:false
                    })
                  } else{
                    const transID = msgBody
                    daiToken.methods.transfer(SITE_ADDRESS, tokenAmount).send({ from: account, gas: 80000 })
                    .on('transactionHash', (hash) => {
                      transHash = hash.toString()
                      let info = {id: transID, hash: transHash, status: status}
                      Auth.updateTransaction(info).then(() => {
                      })
                    })
                    .on('receipt', (receipt) => {
                      setLoading(false)
                      if(receipt.status == 1) {
                        Auth.updateTokens({amount: amount}).then((data) => {
                          const { msgBody, msgError } = data.message
                          if(!msgError){
                            status = 'Success'
                            let info = {id: transID, hash: transHash, status: status}
                            Auth.updateTransaction(info).then(() => {
                            const { msgBody, msgError } = data
                            if(!msgError){
                              setUser(tempUser)
                              setAlert({
                                open:true,
                                duration:20000,
                                anchor:{
                                  vertical: 'top',
                                  horizontal: 'left',
                                },
                                message:"Transaction Successful",
                                action:false
                              })
                            }
                          })
                          }
                          else
                            setAlert({
                              open:true,
                              duration:20000,
                              anchor:{
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              message:`Error Saving Transaction to Database`,
                              action:false
                            })
                        })
                      }
                    })
                    .on('error', (error, receipt) => {
                        status = 'Error'
                        let info = {id: transID, hash: transHash, status: status}
                        Auth.updateTransaction(info).then(() => {
                          const { msgBody, msgError } = data
                          if(!msgError){
                            setAlert({
                              open:true,
                              duration:20000,
                              anchor:{
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              message:`Transaction Error`,
                              action:false
                            })
                            setLoading(false)
                          }
                        })
                      })
                    }
                  })
                }
              })
          }
      }

      const sellCoins = (e) => {
        e.preventDefault()
        let dailyTotal = 0
        let numOfTrans = 0
        Auth.getTransactions().then((data) =>{
            const { transactions } = data
            transactions.filter(t => t.type === 'Sell' && t.status === 'Success').filter(t => {
              const transDate = new Date(t.createdAt)
              const today = new Date()
              return transDate.getDate() === today.getDate() &&  transDate.getMonth() === today.getMonth() && transDate.getFullYear() === today.getFullYear()
            }).forEach(t => {
              numOfTrans++
              dailyTotal += t.amount
            })
            const { balance } = user
            const amount = parseInt(balance) - parseInt(sellAmount)
            if(parseInt(sellAmount) <= 0 || sellAmount === null){
              setAlert({
                open:true,
                duration:6000,
                anchor:{
                  vertical: 'top',
                  horizontal: 'center',
                },
                message:"You must enter a valid value",
                action:false
              })
            }
            else if(dailyTotal >= 500){
              setAlert({
                open:true,
                duration:6000,
                anchor:{
                  vertical: 'top',
                  horizontal: 'center',
                },
                message:"You've reached your daily withdraw limit",
                action:false
              })
            }
            else if(numOfTrans >= 5){
              setAlert({
                open:true,
                duration:6000,
                anchor:{
                  vertical: 'top',
                  horizontal: 'center',
                },
                message:"You've reached the daily sell transaction limit of five. Try again tomorrow",
                action:false
              })
            }
            else if(dailyTotal + parseInt(sellAmount) > 500){
              setAlert({
                open:true,
                duration:6000,
                anchor:{
                  vertical: 'top',
                  horizontal: 'center',
                },
                message:"This transaction cannot be completed since it will put you over your daily withdraw limit",
                action:false
              })
            }
            else if(amount >= 0) {
              setAlert({
                open:true,
                duration:6000,
                anchor:{
                  vertical: 'top',
                  horizontal: 'center',
                },
                message:"Make sure you don't refresh the page as it may result in a loss of crypto",
                action:false
              })
              setDialogOpen(false)
              setLoading(true)
              const siteAccount = web3.eth.accounts.wallet.add('d515647b0a3c81ef447440df7e46d492b03024a6f2ff8b3a2a171c805989ff79')
              const tokenAmount = web3.utils.toWei((sellAmount / 10).toString(), 'ether')
              const DAI_TOKEN_ADDRESS = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
              const tempBalance = balance
              const tempUser = user
              tempUser.balance = amount
              let transHash = '0'
              let status = 'Processing'
              Auth.updateTokens({amount: amount}).then((data) => {
                const { msgBody, msgError } = data.message
                if(msgError)
                  alert(msgBody)
              })
              let info = {type: 'Sell',amount: sellAmount}
              Auth.createTransaction(info).then((data) => {
                const { msgBody, msgError } = data
                if(msgError){
                  tempUser.balance = tempBalance
                  setAlert({
                    open:true,
                    duration:20000,
                    anchor:{
                      vertical: 'top',
                      horizontal: 'left',
                    },
                    message:'Create Transaction Error',
                    action:false
                  })
                } else {
                    const transID = msgBody
                    cbBack.methods.sellTokens(DAI_TOKEN_ADDRESS, tokenAmount, account).send({ from: siteAccount.address, gas: 80000 })
                    .on('transactionHash', (hash) => {
                      transHash = hash.toString()
                      let info = {id: transID, hash: transHash, status: status}
                      Auth.updateTransaction(info).then(() => {
                      })
                      })
                      .on('receipt', (receipt) => {
                      setLoading(false)
                    if(receipt.status == 0) {
                        Auth.updateTokens({amount: tempBalance}).then((data) => {
                          const { msgBody, msgError } = data.message
                          if(msgError)
                          status = 'Error'
                          let info = {id: transID, hash: transHash, status: status}
                          Auth.updateTransaction(info).then(() => {
                            const { msgError } = data
                            if(!msgError){
                              setAlert({
                                open:true,
                                duration:20000,
                                anchor:{
                                  vertical: 'top',
                                  horizontal: 'left',
                                },
                                message:`Blockchain Receipt Error`,
                                action:false
                              })
                            }
                          })
                        })
                      } else {
                        status = 'Success'
                        let info = {id: transID, hash: transHash, status: status}
                        Auth.updateTransaction(info).then(() => {
                          const { msgBody, msgError } = data
                          if(!msgError){
                            setAlert({
                              open:true,
                              duration:20000,
                              anchor:{
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              message:`Transaction Successful`,
                              action:false
                            })
                          }
                        })
                      }
                      setUser(tempUser)
                    })
                    .on('error', (error, receipt) => {
                      Auth.updateTokens({amount: tempBalance}).then((data) => {
                        const { msgBody, msgError } = data.message
                        if(!msgError)
                          status = 'Error'
                        let info = {id: transID, hash: transHash, status: status}
                        Auth.updateTransaction(info).then(() => {
                          console.log(error)
                          const { msgBody, msgError } = data
                          if(!msgError){
                            setAlert({
                              open:true,
                              duration:20000,
                              anchor:{
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              message:`Blockchain Transaction Error: ${error}`,
                              action:false
                            })
                          }
                        })
                      })
                      setLoading(false)
                    })
                  }
                })
              }
              else {
                setLoading(false)
                setAlert({
                  open:true,
                  duration:20000,
                  anchor:{
                    vertical: 'top',
                    horizontal: 'center',
                  },
                  message:`Cannot sell more tokens than owned`,
                  action:true
                })
              }    
        })
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
                    onKeyUp={(e) => {
                         if(e.KeyboardEvent.code == 13)
                            buyCoins(e)
                      }}
                    autoComplete="off"
                    autoFocus
                    className={classes.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoney />
                        </InputAdornment>
                      ),
                    }}/>
                    <Chip className={classes.chip} variant="outlined" size="large" mt={1} label={accountDisplay} />
                    <Typography type="subtitile1" className={classes.textField}>
                        Cost:
                    </Typography>
                    <Typography type="subtitile1">
                      <img alt="dai-logo" src={daiLogo} className={classes.daiLogo} /> {buyAmount / 10}
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
                    onKeyUp={(e) => {
                         if(e.KeyboardEvent.code == 13)
                            sellCoins(e)
                      }}
                    autoComplete="off"
                    autoFocus
                    className={classes.textField}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        <AttachMoney />
                        </InputAdornment>
                      ),
                    }}/>
                    <Chip className={classes.chip} variant="outlined" size="large" mt={1} label={accountDisplay} />
                    <Typography type="subtitile1" className={classes.textField}>
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
                      onProfile={openProfile} 
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
