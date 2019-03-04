/*
 *
 * Item reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_ITEMS, DELETE_ITEM } from './constants';

export const initialState = fromJS({
  item: []
});

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_ITEMS:
      return state.set('item', action.data);
    case DELETE_ITEM:
      return state;
    default:
      return state;
  }
}

export default itemReducer;
