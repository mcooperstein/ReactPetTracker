import { combineReducers } from 'redux';
import petReducer from './pets';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  petsState: petReducer
});

export default rootReducer;
