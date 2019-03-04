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

/* eslint-disable react/prefer-stateless-function */
class Banner extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Reactive Items
        </h1>
      </div>
    );
  }
}

Banner.propTypes = {};

export default Banner;
