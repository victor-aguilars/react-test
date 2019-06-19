import React, { Component } from "react";
import "./App.css";
import { Button, Form, Container, Row } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      apiResponse: "",
      value: ""
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:9000/testAPI/transformText", {
      method: 'POST',
      body: JSON.stringify({text: this.state.value}) ,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.text())
    .then(res => this.setState({ apiResponse: res }))
    .catch(err => err);
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    // this.callAPI();
  }

  render() {
    return (
      <Container>
        <Row>
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="my-5">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label className="title">Text to transform</Form.Label>
                  <Form.Control
                    placeholder="Enter text"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  MAYUS
                </Button>
                <br /><br />
                <p>{this.state.apiResponse}</p>
              </Form>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

export default App;
