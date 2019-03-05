/**
 *
 * Banner
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Jumbotron, Button } from 'reactstrap';
/* eslint-disable react/prefer-stateless-function */
class Banner extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>
            Reactive Items
          </h1>
        </Jumbotron>
        
      </div>
    );
  }
}

Banner.propTypes = {};

export default Banner;
