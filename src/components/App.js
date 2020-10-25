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
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
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
      window.alert('DaiToken contract not deployed to detected network.')
    }

    // Load BSBack
    const BSBackData = BSBack.networks[networkId]
    if(BSBackData) {
      const bsBack = new web3.eth.Contract(BSBack.abi, BSBackData.address)
      this.setState({ bsBack })
      await this.loadUser()
    } else {
      window.alert('BSBack contract not deployed to detected network.')
    }
    this.setState({ loading: false })
  }

  async loadUser() {
    const username = await this.state.bsBack.methods.getUsername(this.state.user.account).call()
    this.calculateKDA()
    if(username == '') {

    }
  }

  addUser = (_username) => {
    this.state.bsBack.methods.addUser(_username).send({ from: this.state.user.account }).on('transactionHash', (hash) => {
      const user = this.state.user
      user.username = _username

    })
  }

  buyCoins = (amount) => {
    this.setState({ loading: true })
    window.alert(amount)
    this.state.daiToken.methods.approve(this.state.bsBack._address, amount).send({ from: this.state.user.account }).on('transactionHash', (hash) => {
      this.state.bsBack.methods.buyCoins(amount).send({ from: this.state.user.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      }).catch((error) => {
        this.setState({ loading: false })
        window.alert(error.message)
      })
    }).catch((error) => {
      this.setState({ loading: false })
      window.alert(error.message)
    })
  }

  sellCoins = (amount) => {
    this.setState({ loading: true })
    this.state.bsBack.methods.sellCoins(amount).send({ from: this.state.user.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    }).catch((error) => {
      this.setState({ loading: false })
      window.alert(error.message)
    })
  }

  calculateKDA = () => {
    const kda = this.state.kills / this.state.deaths;
    this.setState({ kda })
  } 

  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: 'kstamps2484',
        account: '0x0',
        kills: '1',
        deaths: '2',
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
    if(this.state.newUser) {
      content = <Signup addUser = {this.addUser}></Signup>
    }
    if(this.state.loading) {
      content = <Loading loading={this.state.loading}></Loading>
    } else {
      content = <Main
        user={this.state.user}
        buyCoins={this.buyCoins}
        sellCoins={this.sellCoins}
      />
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
