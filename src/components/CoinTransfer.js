// import React, { Component } from 'react'
// import dai from '../dai.png'
// import battleCoin from '../images/battleCoin.png'
// import { Card } from 'react-bootstrap'
// import Button from '@material-ui/core/Button';
// import Form from 'react-bootstrap/FormGroup'

// class CoinTransfer extends Component {

//     buyCoins = (amount) => {
//         this.props.buyCoins(amount)
//     }

//     render(){
//         return(
//             <React.Fragment>
//             <Card className="mt-5" bg="dark" text="light">
//                 <Card.Body>
//                 <Button variant="contained" color="primary">
//                     Hello World
//                 </Button>
//                     <Form>
//                         <Form.Group controlId="formBasicEmail">
//                             <Form.Label>Email address</Form.Label>
//                             <Form.Control type="number" placeholder="Enter email" />
//                             <Form.Text className="text-muted">
//                             We'll never share your email with anyone else.
//                             </Form.Text>
//                         </Form.Group>
//                     </Form>
//                         <form className="mb-3" onSubmit={(event) => {
//                             event.preventDefault()
//                             let amount
//                             amount = this.input.value.toString();
//                             //   amount = window.web3.utils.toWei(amount, 'Ether')
//                             }}>
//                             <div className="input-group mb-4">
//                             <input
//                                 type="text"
//                                 ref={(input) => { this.input = input }}
//                                 className="form-control form-control-lg"
//                                 placeholder="0"
//                                 required />
//                             <div className="input-group-append">
//                                 <div className="input-group-text">
//                                 <img src={dai} height='32' alt=""/>
//                                 &nbsp;&nbsp;&nbsp; DAI
//                                 </div>
//                             </div>
//                             </div>
//                             <button type="submit" className="btn btn-primary btn-block btn-lg">Buy Coins</button>
//                         </form>
//                     </Card.Body>
//                 </Card>
//                 <Card className="mt-3" bg="dark" text="light">
//                     <Card.Body>
//                         <form className="mb-3" onSubmit={(event) => {
//                             event.preventDefault()
//                             let amount
//                             amount = this.input.value.toString()
//                             amount = window.web3.utils.toWei(amount, 'Ether')
//                             this.props.sellCoins(amount)
//                             }}>
//                             <div className="input-group mb-4">
//                             <input
//                                 type="text"
//                                 ref={(input) => { this.input = input }}
//                                 className="form-control form-control-lg"
//                                 placeholder="0"
//                                 required />
//                             <div className="input-group-append">
//                                 <div className="input-group-text">
//                                 <img src={battleCoin} height='32' alt=""/>
//                                 &nbsp;&nbsp;&nbsp; BC
//                                 </div>
//                             </div>
//                             </div>
//                             <button type="submit" className="btn btn-primary btn-block btn-lg">Sell Coins</button>
//                         </form>
//                     </Card.Body>
//                 </Card>
//             </React.Fragment>
//         );
//     }

// }

// export default CoinTransfer;