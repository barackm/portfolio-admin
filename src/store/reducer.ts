import { combineReducers } from '@reduxjs/toolkit';
import entites from './entities';
import auth from './slices/auth';

const rootReducer = combineReducers({
  entites,
  auth,
});

export default rootReducer;
