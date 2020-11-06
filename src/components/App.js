import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
// import io from 'socket.io-client'
// import Web3 from 'web3'
// import BSBack from '../abis/BSBack.json'
// import DaiToken from '../abis/DaiToken.json'
// import Loading from './Loading'
import Main from './Main'
import Navbar from './Navbar'
// import Auth from '../services/Auth'

import { Container } from '@material-ui/core'
import './App.css'
import FrontPage from './FrontPage'
// import axios from 'axios'

// const socket = io.connect('http://localhost:4000')

function App() {
  const { isAuthenticated } = useContext(AuthContext)
  // const [user, setUser] = useState({username: '', password: '', email: '', role: 'user', account: '0x0', balance: '0'})
  // const [daiToken, setDaiToken] = useState({})
  // const [bsBack, setBSBack] = useState({})


  //use for any componentwillmount calls
  // useEffect(async () => {
    // await loadWeb3()
    // await loadBlockchainData()
    // socket.on('connect', () => {
    //   socket
    //     .emit('authenticate', { token: jwt }) //send the jwt
    //     .on('authenticated', () => {
    //       //do other things
    //       socket
    //       .on('userAdded', (res) => {
    //         alert(res.message)
    //         setLoggedIn(true)
    //         setIsLoaded(false)
    //       .on('error', (_error) => {
    //           alert(_error.message)
    //           setIsLoaded(false)
    //       })
    //     })
    //     .on('unauthorized', (msg) => {
    //       console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
    //       throw new Error(msg.data.type);
    //     })
    //     })
    // })
  // }, [])

  //use for any componentwillunmount calls
  // useEffect(() => {
  //   return () => {

  //   }
  // }, [])

  // const loadWeb3 = async () => {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum)
  //     await window.ethereum.enable()
  //   }
  //   else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider)
  //   }
  //   else {
  //     alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  //   }
  // }


  // const loadBlockchainData = async () => {
  //   const web3 = window.web3
  //   // const maticWallet = new HDWalletProvider(process.env.MNEMONIC, )
  //   // const web3Matic = new Web3(config.MUMBAI_PROVIDER)

  //   const accounts = await web3.eth.getAccounts()
    
  //   // let _user = user
  //   // _user.account = accounts[0]
    
  //   // setUser(_user)

    
  //   const networkId = await web3.eth.net.getId()
    
  //   // Load DaiToken
  //   //address 0xCdcdC7745Dc0b74FaACAc2D472D5A80264C7388A
  //   const daiTokenData = DaiToken.networks[networkId]
  //   if(daiTokenData) {
  //     const _daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
  //     setDaiToken(_daiToken)
      
  //   } else {
  //     alert('DaiToken contract not deployed to detected network.')
  //   }

  //   // const cwBack = new web3Matic.eth.Contract(CW_ABI, CW_ADDRESS)
  //   // this.setState({ cwBack })
    
  //   // Load BSBack
  //   //address 0x4E46ddb632F902512851BCd52FE55DCa0E38fC16
  //   const BSBackData = BSBack.networks[networkId]
  //   if(BSBackData) {
  //     const _bsBack = new web3.eth.Contract(BSBack.abi, BSBackData.address)
  //     setBSBack(_bsBack)
  //   } else {
  //     alert('Crypto Wars smart contract not deployed to detected network.')
  //   }
  //   setIsLoaded(false)
  // }
  
  // const loadContract = async () => {
    // const username = await bsBack.methods.getUsername(account).call()
    // alert(`username: ${username}`)
    // if(username === '') {
      // setLoggedIn(false)
    // } else {
      // let _user = user
      // const balance = await bsBack.methods.getBalance(user).call()
      // const kills = await this.state.bsBack.methods.getKills(this.state.user.account).call()
      // const deaths = await this.state.bsBack.methods.getDeaths(this.state.user.account).call()
      // _user.username = username
      // _user.balance = balance
      // user.kills = kills
      // user.deaths = deaths
      // setUser(_user)
      // setLoggedIn(true)
  //   }
  // }

  // const addToContract = () => {
  // bsBack.methods.addUser(_username, pass).send({ from: user.account }).on('transactionHash', (hash) => {
    //   let _user = user
    //   _user.username = _username
    //   setUser(_user)
    //   setLoggedIn(true)
    //   setIsLoaded(false)
    //   }).catch('error', (error) => {
    //     setIsLoaded(false)
    //     alert(`Alert: ${error.message}`)
    //   })
  // }

  // const buyCoins = (amount) => {
  //   setIsLoaded(true)
  //   let balance = parseInt(user.balance)
  //   daiToken.methods.approve(bsBack._address, Web3.utils.toWei(amount)).send({ from: user.account }).on('transactionHash', (hash) => {
  //   bsBack.methods.buyCoins(user.username, amount).send({ from: user.account })
  //     .on('transactionHash', (hash) => {
  //       setIsLoaded(false)
  //     })
  //     .on('receipt', (receipt) => {
  //       let _user = user
  //       balance += parseInt(amount)
  //       _user.balance = balance
  //       // setUser(_user)
  //     })
  //   }).on('error', (error, receipt) => {
  //     setIsLoaded(false)
  //     alert(error.message)
  //   })
  // }

  // const sellCoins = (amount) => {
  //   setIsLoaded(true)
  //   let _user = user
  //   let balance = parseInt(user.balance)
  //   bsBack.methods.sellCoins(user.username, amount).send({ from: user.account, gas: 300000 })
  //   .on('transactionHash', (hash) => {
  //     // this.state.cwBack.methods.sellCoins(this.state.user.account, amount).send({ from: config.CW_KEY }).on('transactionHash', (hash) => {
  //       balance -= parseInt(amount)
  //       _user.balance = balance
  //       // setUser(_user)
  //       setIsLoaded(false)
  //     })
  //     .on('error', (error, receipt) => {
  //     balance += parseInt(amount)
  //     _user.balance = balance
  //     // setUser(_user)
  //     setIsLoaded(false)
  //     alert(error.message)
  //   })
  // }
    let content
    // const loadingContent = <Loading loading={isLoaded} />
    if(!isAuthenticated) {
      content = 
        <FrontPage />
    }
    else {
      content = 
        <Main />
    }

    return (
      <React.Fragment>
        <Navbar />
          <Container>
            {content}
          </Container>
        </React.Fragment>
    );
  }

export default App;
