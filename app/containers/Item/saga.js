import { take, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import { loadItemsAction, addItemAction, appendItemAction, sortItemsAction } from './actions';
import { fromJS } from 'immutable';
import { DELETE_ITEM, EDIT_ITEM, ADD_ITEM, APPEND_ITEM, SORT_ITEMS } from './constants';
import {initialState} from '../Item/reducer';
// Individual exports for testing

function fetchItems() {
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token'),
        "Accept": "application/json"
    }
  };
  let data = {};
  
  return axios.post('http://127.0.0.1:8000/api/items', data, axiosConfig).then((response) => {
    return response.data;
  });
}

export function* deleteItem(action_data) {
  // console.log("inside saga", action_data.id);
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token'),
        "Accept": "application/json"
    }
  };
  
  var data = {
    slug: action_data.slug
  };
  
  return axios.post('http://127.0.0.1:8000/api/delete/item', data, axiosConfig).then((response) => {
    console.log("************* CHECKING ROUTE *************");
    console.log("SAGA:   generator_function: deleteItem() -> will dispatch DELETE_ITEM action");
    return response.data;
  });
}

export function* editItem(action_data) {
  console.log("Inside saga editItem func: ", action_data);
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token'),
        "Accept": "application/json"
    }
  };
  
  var data = {
    id: action_data.data.id,
    name: action_data.data.name,
    price: action_data.data.price,
    quantity: action_data.data.quantity
  };

  console.log(data);
  return axios.post('http://127.0.0.1:8000/api/edit/item', data, axiosConfig).then((response) => {
    return response.data;
  });
}


export function* addItem(action_data) {

  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token'),
        "Accept": "application/json"
    }
  };
  
  var data = {
    name: action_data.data.name,
    price: action_data.data.price,
    quantity: action_data.data.quantity,
    slug: action_data.data.slug
  };

  
  // console.log(state);
  return axios.post('http://127.0.0.1:8000/api/add/item', data, axiosConfig).then((response) => {
    return response.data;
  });

  
}

export function* sortItems(action_data) {
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token'),
        "Accept": "application/json"
    }
  };

  var data = {
    ascending: action_data.data.ascending,
    sortedBy: action_data.data.sortedBy
  };

  return axios.post('http://127.0.0.1:8000/api/sort/items', data, axiosConfig).then((response) => {
    console.log("INSIDE sortItems gen(): ");
    console.log(response.data.items);
    return response.data.items;
  });

}



export default function* itemSaga() {
  // See example in containers/HomePage/saga.js
  try {
    
    
    let data = yield call(fetchItems);
    let item = data.items;
    yield put(loadItemsAction(item));
    
    yield takeLatest(DELETE_ITEM, deleteItem);
    yield takeLatest(EDIT_ITEM, editItem);
    yield takeLatest(ADD_ITEM, addItem);

    yield takeLatest(SORT_ITEMS, sortItems);
    // console.log(response);

  } catch(error) {
    console.log(error);
    console.log(localStorage.getItem('token'));
  }
}
