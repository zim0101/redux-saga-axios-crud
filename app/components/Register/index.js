/**
 *
 * Register
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import axios from 'axios';
import { BrowserRouter as Router ,Redirect, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

/* eslint-disable react/prefer-stateless-function */
class Register extends React.Component {
  constructor () {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      c_password: ''
    };
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleConfirmPasswordChange = (e) => {
    this.setState({
      c_password: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      c_password: this.state.c_password
    };
    axios.post('http://127.0.0.1:8000/api/register', data).then((response) => {
      console.log(response.data);
      this.props.history.push("/login");
    }).catch((error) => {
      console.log(error);
    });
    
  }

  render() {
    return (
      <div>
        <Button outline color="primary">
          <Link to="/">Home</Link>
        </Button>
        <Form onSubmit={this.handleSubmit} >
          <FormGroup>
            <Label for="exampleName">Name</Label>
            <Input type="text" name="name" placeholder="First-name Last-name" onChange={this.handleNameChange} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="text" name="email" placeholder="address@domain.com" onChange={this.handleEmailChange} />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" placeholder="***********" onChange={this.handlePasswordChange} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleConfirmPassword">Confirm Password</Label>
            <Input type="password" name="c_password" placeholder="***********" onChange={this.handleConfirmPasswordChange} />
          </FormGroup>
          <Button type="submit" value="submit" outline color="success">Register</Button>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {};

export default Register;
