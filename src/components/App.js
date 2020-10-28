import React, { Component } from 'react'
import Web3 from 'web3'
import BSBack from '../abis/BSBack.json'
import DaiToken from '../abis/DaiToken.json'
import Signup from './Signup'
import Loading from './Loading'
import Main from './Main'
import './App.css'
import Navbar from './Navbar'
import { Container } from '@material-ui/core'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()

    const user = this.state.user
    user.account = accounts[0]

    this.setState({ user })

    const networkId = await web3.eth.net.getId()

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.user.account).call()
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    } else {
      alert('DaiToken contract not deployed to detected network.')
    }

    // Load BSBack
    const BSBackData = BSBack.networks[networkId]
    if(BSBackData) {
      const bsBack = new web3.eth.Contract(BSBack.abi, BSBackData.address)
      this.setState({ bsBack })
      await this.loadUser()
    } else {
      alert('Crypto Wars smart contract not deployed to detected network.')
    }
    this.setState({ loading: false })
  }

  async loadUser() {
    const username = await this.state.bsBack.methods.getUsername(this.state.user.account).call()
    if(username == '') {
      this.setState({ newUser: true })
    } else {
      const user = this.state.user
      const balance = await this.state.bsBack.methods.getBalance(this.state.user.account).call()
      const kills = await this.state.bsBack.methods.getKills(this.state.user.account).call()
      const deaths = await this.state.bsBack.methods.getDeaths(this.state.user.account).call()
      user.username = username
      user.balance = balance
      user.kills = kills
      user.deaths = deaths
      this.setState({ user })
      this.setState({ newUser: false })
    }
  }

  addUser = (_username) => {
    this.setState({ loading: true })
    // this.state.bsBack.methods.addUser(_username).send({ from: this.state.user.account }).on('transactionHash', (hash) => {
    this.state.bsBack.methods.addUser(_username).send({ from: this.state.user.account }).on('transactionHash', (hash) => {
      const user = this.state.user
      user.username = _username
      this.setState({ user })
      this.setState({ loading: false })
      this.setState({ newUser: false })
    }).on('error', (error) => {
      alert(`Alert: ${error}`)
    })
  }

  buyCoins = (amount) => {
    this.setState({ loading: true })
    alert(amount)
    this.state.daiToken.methods.approve(this.state.bsBack._address, amount).send({ from: this.state.user.account }).on('transactionHash', (hash) => {
      this.state.bsBack.methods.buyCoins(amount).send({ from: this.state.user.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      }).catch((error) => {
        this.setState({ loading: false })
        alert(error.message)
      })
    }).catch((error) => {
      this.setState({ loading: false })
      alert(error.message)
    })
  }

  sellCoins = (amount) => {
    this.setState({ loading: true })
    this.state.bsBack.methods.sellCoins(amount).send({ from: this.state.user.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    }).catch((error) => {
      this.setState({ loading: false })
      alert(error.message)
    })
  }

  // calculateKDA = () => {
  //   const kda = this.state.kills / this.state.deaths;
  //   this.setState({ kda })
  // } 

  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: '',
        account: '0x0',
        kills: '0',
        deaths: '0',
        kda: '0',
        balance: '0'
      },
      daiTokenBalance: '0',
      daiToken: {},
      bsBack: {},
      newUser: true,
      loading: true
    }
  }

  render() {
    let content
    let loading = ''
    if(this.state.loading) {
      loading = <Loading loading={this.state.loading}></Loading>
    } else {
      loading = ''
    }
    if(this.state.newUser) {
      content = <React.Fragment>
          {loading}
        <Signup addUser = {this.addUser}></Signup>
      </React.Fragment>
    }
    else {
      content = <React.Fragment>
          {loading}
        <Main
        user={this.state.user}
        buyCoins={this.buyCoins}
        sellCoins={this.sellCoins}
        />
        </React.Fragment>
    }

    return (
      <React.Fragment>
        <Navbar user={this.state.user} />
          <Container>
            {content}
          </Container>
        </React.Fragment>
    );
  }
}

export default App;
