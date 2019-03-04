/**
 *
 * Login
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
class Login extends React.Component {

  constructor () {
    super();
    this.state = {
      email: '',
      password: ''
    };
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

  handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://127.0.0.1:8000/api/login', data).then((response) => {
      console.log(response.data);
      localStorage.setItem('token', response.data.success.token);
      localStorage.setItem('user_id', response.data.success.user.id);
      localStorage.setItem('user_name', response.data.success.user.name);
      localStorage.setItem('user_email', response.data.success.user.email);
      this.props.history.push("/dashboard/items");
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
            <Label for="exampleEmail">Email</Label>
            <Input type="text" name="email" placeholder="address@domain.com" onChange={this.handleEmailChange} />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" placeholder="***********" onChange={this.handlePasswordChange} />
          </FormGroup>
          <Button type="submit" value="submit" outline color="success">Login</Button>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;
