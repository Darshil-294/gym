import {combineReducers} from 'redux';
import {UserReducer} from './AddReducer';

export const rootReducers = combineReducers({
  user: UserReducer,
});
