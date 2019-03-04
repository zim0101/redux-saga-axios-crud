import { fromJS } from 'immutable';
import itemReducer from '../reducer';

describe('itemReducer', () => {
  it('returns the initial state', () => {
    expect(itemReducer(undefined, {})).toEqual(fromJS({}));
  });
});
