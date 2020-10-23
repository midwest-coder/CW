import React, { Component } from 'react'
import dai from '../dai.png'
import battleCoin from '../images/battleCoin.png'
import { Card } from 'react-bootstrap'

class CoinTransfer extends Component {

    render(){
        return(
            <div>
            <Card className="mt-5" bg="dark" text="light">
                <Card.Body>
                        <form className="mb-3" onSubmit={(event) => {
                            event.preventDefault()
                            let amount
                            amount = this.input.value * 1e18
                            //   amount = window.web3.utils.toWei(amount, 'Ether')
                            this.props.buyCoins(amount)
                            }}>
                            <div className="input-group mb-4">
                            <input
                                type="text"
                                ref={(input) => { this.input = input }}
                                className="form-control form-control-lg"
                                placeholder="0"
                                required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <img src={dai} height='32' alt=""/>
                                &nbsp;&nbsp;&nbsp; DAI
                                </div>
                            </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-lg">Buy Coins</button>
                        </form>
                    </Card.Body>
                </Card>
                <Card className="mt-3" bg="dark" text="light">
                    <Card.Body>
                        <form className="mb-3" onSubmit={(event) => {
                            event.preventDefault()
                            let amount
                            amount = this.input.value.toString()
                            amount = window.web3.utils.toWei(amount, 'Ether')
                            this.props.sellCoins(amount)
                            }}>
                            <div className="input-group mb-4">
                            <input
                                type="text"
                                ref={(input) => { this.input = input }}
                                className="form-control form-control-lg"
                                placeholder="0"
                                required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <img src={battleCoin} height='32' alt=""/>
                                &nbsp;&nbsp;&nbsp; BC
                                </div>
                            </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-lg">Sell Coins</button>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

export default CoinTransfer;