import { combineReducers } from '@reduxjs/toolkit';
import entities from './entities';
import auth from './slices/auth';

const rootReducer = combineReducers({
  entities,
  auth,
});

export default rootReducer;
