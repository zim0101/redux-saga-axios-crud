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
import logo from '../../images/inventory.png';
const bannerStyle = {
  color: 'white',
  backgroundColor: '#080f19'
}

const logoStyle = {
  height: '100%',
  width: '200px'
}

const reactiveStyle = {
  color: 'red'
}

const inventoryStyle = {
  color: 'white'
}

class Banner extends React.Component {
  render() {
    return (
      <div >
        <Jumbotron style={bannerStyle}>
          <div className="row">
            {/* <div className="col-md-12">
              <img style={logoStyle} src={logo}></img>
            </div> */}
            <div className="col-md-12">
              <h1 className="text-center">
                <span style={reactiveStyle}>Reactive</span> <span style={inventoryStyle}>Inventory</span>
              </h1>
            </div>
          </div>
        </Jumbotron>
        
      </div>
    );
  }
}

Banner.propTypes = {};

export default Banner;
