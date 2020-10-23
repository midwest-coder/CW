import React, { Component } from 'react'
import logo from '../images/cryptoWars.png'
import { Navbar, Nav, FormControl, Form, Button } from 'react-bootstrap'

class TopNav extends Component {

  render() {
    return (
      <Navbar bg="dark" variant="dark" className="align-baseline">
      <Navbar.Brand href="#home">
        <img src={logo} width="25%" height="25%" className="d-inline-block" alt="" />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <div className="ml-auto">
      <Navbar.Text>
        <small>Username:</small>
        <span className="text-light mx-1">{this.props.user.username}</span>
        <small className="text-light ml-2 mr-1">Battle Coins:</small>
        <span className="mr-5">{this.props.user.coinBalance}</span>
      </Navbar.Text>
      <Button variant="outline-info" className="mx-1">Buy</Button>
      <Button variant="outline-primary" className="mx-1">Sell</Button>
      </div>
    </Navbar>
    );
  }
}

export default TopNav;
