import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

class Loading extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <Card className="mt-3" bg="dark" text="light">
            <Card.Body>
                <p id="loader" className="text-center d.inline">Loading</p>
                {/* <Spinner animation="border" variant="info"/> */}
            </Card.Body>
        </Card>
    );
  }
}

export default Loading;

