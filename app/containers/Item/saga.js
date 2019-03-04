import { take, call, put, select } from 'redux-saga/effects';
import axios from "axios";
import { loadItemsAction } from './actions';
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

function deleteItem() {
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token'),
        "Accept": "application/json"
    }
  };
  let data = {};
  
  // return axios.post('http://127.0.0.1:8000/api/delete/item/'+item_id, data, axiosConfig).then((response) => {
  //   return response.data;
  // });
}

export default function* itemSaga() {
  // See example in containers/HomePage/saga.js
  try {
    let data = yield call(fetchItems);
    let item = data.items;
    console.log(item);
    yield put(loadItemsAction(item));
  } catch(error) {
    console.log(error);
    console.log(localStorage.getItem('token'));
  }
}
