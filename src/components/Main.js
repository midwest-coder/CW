import React, { Component } from 'react'
import CoinTransfer from './CoinTransfer'

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    }
  }

  buyCoins = (amount) => {
    this.props.buyCoins(amount)
  }

  sellCoins = (amount) => {
    this.props.sellCoins(amount)
  }

  render() {
    return (
      <div id="content" className="mt-3">
        <CoinTransfer
        user={this.state.user}
        buyCoins={this.buyCoins}
        sellCoins={this.sellCoins}>
        </CoinTransfer>
      </div>
    );
  }
}

export default Main;
