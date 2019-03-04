/*
 *
 * Item actions
 *
 */

import { DEFAULT_ACTION, LOAD_ITEMS, DELETE_ITEM} from './constants';

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

export function deleteItemAction(id) {
  return {
    type: DELETE_ITEM,
    id
  }
}