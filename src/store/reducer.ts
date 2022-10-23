import { combineReducers } from '@reduxjs/toolkit';
import entites from './entities';

const rootReducer = combineReducers({
  entites,
});

export default rootReducer;
