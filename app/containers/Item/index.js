/**
 *
 * Item
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectItem from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Banner from '../../components/Banner';

/* eslint-disable react/prefer-stateless-function */
export class Item extends React.Component {

  handleLogout = (e) => {
    localStorage.setItem('token', null);
    localStorage.setItem('user_id', null);
    localStorage.setItem('user_name', null);
    localStorage.setItem('user_email', null);
    this.props.history.push("/login");
  }

  // createListItem() {
  //   return this.props.products.map((product) => {
  //       return (
  //           <ListGroupItem className="justify-content-between" key={product.id} onClick = {() => this.props.selectProduct(product)}> 
  //               {product.name} <Badge pill>{product.quantity}</Badge>
  //           </ListGroupItem>
  //       );
  //   });
  // };

  renderItems = () => {
    console.log("Items: ", this.props.item.item);


    return this.props.item.item.map((i) => {
      return (
        <div>
          <li key={i.id}>
            {i.name}
            <Button key={"edit"+i.id} outline color="primary">Edit</Button>
            <Button key={"delete"+i.id} outline color="danger">Delete</Button>
          </li>
        </div>
      );
    });
    
  }

  render() {

    // const items = this.props.item;
    // console.log(items);

    return (
      <div>
        <Helmet>
          <title>Item</title>
          <meta name="description" content="Description of Item" />
        </Helmet>

        <Banner />
        <Button outline color="info" >
          <Link to="/" >Home</Link>
        </Button>
        <Button outline color="warning" onClick={this.handleLogout}>
          Logout
        </Button>
        <h2>Items</h2>
        <ul>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}

Item.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  item: makeSelectItem(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'item', reducer });
const withSaga = injectSaga({ key: 'item', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Item);
