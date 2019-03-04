import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the item state domain
 */

const selectItemDomain = state => state.get('item', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Item
 */

const makeSelectItem = () =>
  createSelector(selectItemDomain, substate => substate.toJS());

export default makeSelectItem;
export { selectItemDomain };
