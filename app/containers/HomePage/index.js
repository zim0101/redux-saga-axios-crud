/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'reactstrap';
import { Jumbotron } from 'reactstrap';


/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <Jumbotron>
          <Button outline color="info" size="lg" block>
            <Link to="/login">Login</Link>
          </Button>
          <Button outline color="info" size="lg" block>
            <Link to="/register">Register</Link>
          </Button>
        </Jumbotron>
        
      </div>
    );
  }
}
