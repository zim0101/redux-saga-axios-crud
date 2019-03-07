/*
 *
 * Item reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_ITEMS, DELETE_ITEM, ADD_ITEM, EDIT_ITEM, SORT_ITEMS_2 } from './constants';

export const initialState = fromJS({
  item: []
});

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION: {
      return state;
    }
      
    case LOAD_ITEMS: {
      // console.log("load_item", action);
      return state.set('item', action.data);
    }

    case SORT_ITEMS_2: {
      // console.log("sort_item>>>>>>>>>>", action);
      return state.set('item', action.data);
    }

    case ADD_ITEM: {
      const item = fromJS(state.get('item'));
      // console.log(action);

      var selected_item = {
        id: action.data.id,
        name: action.data.name,
        price: action.data.price,
        quantity: action.data.quantity,
        slug: action.data.slug
      
      }
      
      return state.set('item', item.insert(0, selected_item));
        
    }

    case DELETE_ITEM: {

      // console.log("Inside Reducer: DELETE_ITEM");
      const item = fromJS(state.get('item'));
      for (const key in item.toJS()) {
        if (item.toJS()[key].slug == action.slug) {
          return state.set('item', item.deleteIn([key]));
        }
      }
      return state;
    }

    case EDIT_ITEM: {
      // console.log("Inside Item reducer");
      const item = fromJS(state.get('item'));
      // console.log(action);

      var selected_item = {
        id: action.data.id,
        name: action.data.name,
        price: action.data.price,
        quantity: action.data.quantity
      }
      for (const key in item.toJS()) {
        // console.log(item.toJS()[key].name, item.toJS()[key].price, item.toJS()[key].quantity);
        if (item.toJS()[key].id == action.data.id) {
          const item = fromJS(state.get('item'));
          return state.set('item', item.unshift(selected_item));
        }
      }
      return state;
    }

    

    default:
      return state;
  }
}

export default itemReducer;
