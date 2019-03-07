import { take, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import { loadItemsAction, addItemAction, appendItemAction, sortItemsAction, sortItems2Action } from './actions';
import { fromJS } from 'immutable';
import { DELETE_ITEM, EDIT_ITEM, ADD_ITEM, APPEND_ITEM, SORT_ITEMS, LOAD_ITEMS, SORT_ITEMS_2, SEND_SEARCH_KEYWORDS, SEND_PRICE_RANGE } from './constants';
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
    // console.log("************* CHECKING ROUTE *************");
    // console.log("SAGA:   generator_function: deleteItem() -> will dispatch DELETE_ITEM action");
    return response.data;
  });
}

export function* editItem(action_data) {
  // console.log("Inside saga editItem func: ", action_data);
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

  // console.log(data);
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

async function sortItemsRequest(action_data) {
  // console.log("======================= 1st async func() =======================");
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

  // console.log("======================= 1st async func() data =======================", data);

  let x = await axios.post('http://127.0.0.1:8000/api/sort/items', data, axiosConfig).then((response) => {
    return response.data.items;
  });

  // console.log("======================= 1st async func() response =======================", x);

  return x;
}


export function* loadSortedItems(action_data) {

  try {
    // console.log("========================= loadSortedItems saga function ====================");
    const items = yield call(sortItemsRequest, action_data);
    // console.log("############", items);
    // dispatch({ type: LOAD_ITEMS, products });
    yield put(sortItems2Action(items));
    // return items;
  } catch (error) {
    // console.log("===========================!!!!!!ERROR!!!!! in saga func()===========================");
    console.log(error);
  }
  
}


// ===================================== Search by name =====================================
async function nameSearchResultRequest(action_data) {
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token'),
        "Accept": "application/json"
    }
  };

  var data = {
    type: 'name',
    keywords: action_data.data.keywords,
    min: action_data.data.min,
    max: action_data.data.max,
  };

  let response = await axios.post('http://127.0.0.1:8000/api/search/items', data, axiosConfig).then((response) => {
    return response.data.items;
  });
  return response;
}

export function* loadMatchedItemsByName(action_data) {
  try {
    const items = yield call(nameSearchResultRequest, action_data);
    yield put(sortItems2Action(items));
  } catch (error) {
    console.log(error);
  }
  
}

// ===================================== Search by price =====================================
async function priceSearchResultRequest(action_data) {
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem('token'),
        "Accept": "application/json"
    }
  };

  var data = {
    type: 'price',
    min: action_data.data.min,
    max: action_data.data.max
  };

  let response = await axios.post('http://127.0.0.1:8000/api/search/items', data, axiosConfig).then((response) => {
    return response.data.items;
  });
  return response;
}

export function* loadMatchedItemsByPrice(action_data) {
  try {
    const items = yield call(priceSearchResultRequest, action_data);
    yield put(sortItems2Action(items));
  } catch (error) {
    console.log(error);
  }
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
    yield takeLatest(SORT_ITEMS, loadSortedItems);
    yield takeLatest(SEND_SEARCH_KEYWORDS, loadMatchedItemsByName);
    yield takeLatest(SEND_PRICE_RANGE, loadMatchedItemsByPrice);
  } catch(error) {
    console.log(error);
    // console.log(localStorage.getItem('token'));
  }
}
