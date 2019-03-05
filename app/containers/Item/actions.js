/*
 *
 * Item actions
 *
 */

import { DEFAULT_ACTION, LOAD_ITEMS, DELETE_ITEM, ADD_ITEM, EDIT_ITEM, APPEND_ITEM, ADD_ITEM_INTO_STORE, SORT_ITEMS} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadItemsAction(data) {
  return {
    type: LOAD_ITEMS,
    data
  };
}

export function deleteItemAction(slug) {
  return {
    type: DELETE_ITEM,
    slug
  }
}

export function editItemAction(data) {
  return {
    type: EDIT_ITEM,
    data
  }
}

export function addItemAction(data) {
  return {
    type: ADD_ITEM,
    data
  }
}

export function sortItemsAction(data) {
  console.log("SORT_ITEM action", data);
  return {
    type: SORT_ITEMS,
    data
  }
}
