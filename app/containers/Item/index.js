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
import Banner from '../../components/Banner';
import { deleteItemAction, editItemAction, addItemAction, sortItemsAction, loadItemsAction, sendSearchKeywordsAction, sendPriceRangeAction } from './actions';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Table } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
// import {uniqid} from 'uniqid';

var uniqid = require('uniqid');
/* eslint-disable react/prefer-stateless-function */

const appBackgroundStyle = {
  backgroundColor: '#0a0e14'
};

const midAppBackgroundStyle = {
  backgroundColor: '#1c2128'
};

const textStyle = {
  color: 'white'
};

export class Item extends React.Component {

  constructor () {
    super();
    this.state = {
      viewEditForm: false,
      // Edit data
      id: null,
      name: '',
      price: 0,
      quantity: 0,
      // Add new 
      new_name: '',
      new_price: 0,
      new_quantity: 0,
      new_slug: '',
      product_ascending: false,
      price_ascending: false,
      quantity_ascending: false,
      sortedBy: '',
      keywords: '',
      search_type: '',
      price_range: {min: 0, max:10}
    }
  }

  handleLogout = (e) => {
    localStorage.setItem('token', null);
    localStorage.setItem('user_id', null);
    localStorage.setItem('user_name', null);
    localStorage.setItem('user_email', null);
    this.props.history.push("/login");
  }

  handleDelete = (e) => {
    // console.log("INSPECT DELETE_ITEM: ", e.target.value);
    this.props.deleteItem(e.target.value);
  }

  handleEditFormViewChange = (e) => {
    e.preventDefault();
    this.setState({viewEditForm: true});
    // console.log(this.state.viewEditForm);
    // console.log(this.props.item.item);
    this.props.item.item.map((i) => {
      if(e.target.value == i.id) {
        this.setState({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })        
      }
    });
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handlePriceChange = (e) => {
    this.setState({
      price: e.target.value
    })
  }

  handleQuantityChange = (e) => {
    this.setState({
      quantity: e.target.value
    })
  }

  handleEditSubmit = (e) => {
    e.preventDefault();
    
    var data = {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      quantity: this.state.quantity,
      slug: this.state.slug
    }

    // console.log("handleEditSubmit data: ", data);

    this.props.editItem(data);
  }

  closeEditForm = () => {
    this.setState({viewEditForm: false});
  }

  editForm = () => {
    // console.log(e.target.value);
    return (
      <div>
        <hr></hr>
        <h4>Edit Item</h4>
        <Form onSubmit={this.handleEditSubmit}>
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="product name" value={this.state.name} onChange={this.handleNameChange} />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup>
                <Label for="price">Price</Label>
                <Input type="number" name="price" id="price" placeholder="$$$" value={this.state.price} onChange={this.handlePriceChange} />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Input type="number" name="quantity" id="quantity" placeholder="" value={this.state.quantity} onChange={this.handleQuantityChange} />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Button outline color="success">Save</Button>
              <Button outline color="warning" onClick={this.closeEditForm}>Cancel</Button>
            </div>
            <div className="col-md-2">
              
            </div>
            <div className="col-md-8"></div>
          </div>
        </Form>
        <hr></hr>
      </div>
    );
  }

  // Functions on Adding New Item
  
  handleNewNameChange = (e) => {
    this.setState({new_name: e.target.value});
  }

  handleNewPriceChange = (e) => {
    this.setState({new_price: e.target.value});
  }

  handleNewQuantityChange = (e) => {
    this.setState({new_quantity: e.target.value});
  }

  handleAddItemSubmit = (e) => {
    e.preventDefault();

    // generate slug:
    if(!this.props.item.item.length) {
      var slug = uniqid();
      // console.log("UNIQID: ", slug);
      // console.log("No item");
    } else {
      // console.log("got items");
      do {
        var status = true;
        var slug = uniqid();
        // console.log(slug);
        this.props.item.item.map((element) => {
          if(element.slug === slug) {
            status = true;
          } else {
            status = false;
          }
        });



        if(status) {
          continue;
        } else {
          break;
        }
      } 
      while (true);
    }

    var data = {
      name: this.state.new_name,
      price: this.state.new_price,
      quantity: this.state.new_quantity,
      slug: slug
    }

    var response = this.props.addItem(data);
    // console.log(response);
  }

  handleNameSort = (e) => {
    this.setState({
      product_ascending: !this.state.product_ascending,
      price_ascending: false,
      quantity_ascending: false
    });

    var data = {
      ascending : this.state.product_ascending,
      sortedBy: e.target.value
    }

    this.props.sortItems(data);
  }

  handlePriceSort = (e) => {
    this.setState({
      product_ascending: false,
      price_ascending: !this.state.price_ascending,
      quantity_ascending: false
    });

    var data = {
      ascending : this.state.price_ascending,
      sortedBy: e.target.value
    }

    this.props.sortItems(data);
  }

  handleQuantitySort = (e) => {
    this.setState({
      product_ascending: false,
      price_ascending: false,
      quantity_ascending: !this.state.quantity_ascending
    });

    var data = {
      ascending : this.state.quantity_ascending,
      sortedBy: e.target.value
    }

    this.props.sortItems(data);
  }

  test_function = () => {
    this.props.loadItems();
  }

  handleKeywordsChange = (e) => {
    this.setState({keywords: e.target.value});
    this.setState({search_type: 'name'});
    
    // console.log(this.state.keywords.length);
    if(this.state.keywords.length > 1) {
      // console.log("length > 1")
      setTimeout(() => {
        let data = {
          keywords: this.state.keywords,
          type: this.state.search_type,
          min: this.state.price_range.min,
          max: this.state.price_range.max,
        }
        this.props.sendSearchKeywords(data);
        // console.log("executed");
      }, 1000);
    }
  }

  renderItems = () => {
    // console.log("Items: ", this.props.item.item);
      
          
        
    
      return this.props.item.item.map((data, key) => {
        return (
          
            <tr key={key}>
              
              <th style={textStyle} scope="row">{key}</th>
              <td style={textStyle}>{data.name}</td>
              <td style={textStyle}>{data.price}</td>
              <td style={textStyle}>{data.quantity}</td>
              <td >
                <Button outline color="primary" value={data.id} onClick={this.handleEditFormViewChange} >Edit</Button>
              </td>
              <td>
                <Button outline color="danger" value={data.slug} onClick={this.handleDelete} >Delete</Button>
              </td>
            </tr>
          
          
        );
      });
    // </table>

    
    
  }

  render() {

    return (
      <div style={textStyle}>
        <Helmet>
          <title>Item</title>
          <meta name="description" content="Description of Item" />
        </Helmet>
        <Banner />
        
        <Jumbotron style={appBackgroundStyle}>
          
          <Button outline color="info" >
            <Link to="/" >Home</Link>
          </Button>
          <Button outline color="warning" onClick={this.handleLogout}>
            Logout
          </Button>

          <Jumbotron style={midAppBackgroundStyle}>
            <h2 style={textStyle}>Add Item</h2>
            <div>
              <Form onSubmit={this.handleAddItemSubmit} >
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input type="text" name="name" id="name" placeholder="product name" value={this.state.new_name} onChange={this.handleNewNameChange} />
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <Label for="price">Price</Label>
                      <Input type="number" name="price" id="price" placeholder="$$$" value={this.state.new_price} onChange={this.handleNewPriceChange} />
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <Label for="quantity">Quantity</Label>
                      <Input type="number" name="quantity" id="quantity" placeholder="" value={this.state.new_quantity} onChange={this.handleNewQuantityChange} />
                    </FormGroup>
                  </div>
                </div>
                <Button outline color="success">Save</Button>
              </Form>
            </div>
            <br></br>
            <br></br>
            <div className="row">
              <div className="col-md-2">
                <h2>Items</h2>
              </div>
              <div className="col-md-4">
                <Input type="text" name="keywords" placeholder="Search" value={this.state.keywords} onChange={this.handleKeywordsChange} />
              </div>
              <div className="col-md-6">
                <InputRange
                  maxValue={100}
                  minValue={0}
                  value={this.state.price_range}
                  onChange={price_range => this.setState({ price_range })}
                  onChangeComplete={price_range => {this.props.sendPriceRange(price_range)}} /> 
                <hr></hr>
                <h6 className="text-center">Price Range</h6>
              </div>
            </div>
            

            <div>
              {this.state.viewEditForm ? this.editForm() : ''}
            </div>
            <div >
              <Table>
                <thead>
                  <tr>
                    <th style={textStyle}>#</th>
                    <th style={textStyle}>Product {this.state.product_ascending ? <Button outline color="info" size="sm" value="name" onClick={this.handleNameSort}>DSC</Button> : <Button outline color="info" size="sm" value="name" onClick={this.handleNameSort} >ASC</Button>}</th>
                    <th style={textStyle}>Price {this.state.price_ascending ? <Button outline color="info" size="sm" value="price" onClick={this.handlePriceSort}>DSC</Button> : <Button outline color="info" size="sm" value="price" onClick={this.handlePriceSort} >ASC</Button>}</th>
                    <th style={textStyle}>Quantity {this.state.quantity_ascending ? <Button outline color="info" size="sm" value="quantity" onClick={this.handleQuantitySort}>DSC</Button> : <Button outline color="info" size="sm" value="quantity" onClick={this.handleQuantitySort} >ASC</Button>}</th>
                    <th style={textStyle}>Edit</th>
                    <th style={textStyle}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderItems()}
                </tbody>
              </Table>
              
            </div>
          </Jumbotron>
        </Jumbotron>
        
          
        
      </div>
    );
  }
}

Item.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  item: makeSelectItem(),
});

function mapDispatchToProps(dispatch) {
  return {
    deleteItem: (slug) => dispatch(deleteItemAction(slug)),
    editItem: (data) => dispatch(editItemAction(data)),
    addItem: (data) => dispatch(addItemAction(data)),
    sortItems: (data) => dispatch(sortItemsAction(data)),
    loadItems: (data) => dispatch(loadItemsAction(data)),
    sendSearchKeywords: (data) => dispatch(sendSearchKeywordsAction(data)),
    sendPriceRange: (data) => dispatch(sendPriceRangeAction(data))
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
