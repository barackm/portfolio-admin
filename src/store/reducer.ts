import { combineReducers } from '@reduxjs/toolkit';
import entities from './entities';
import auth from './slices/auth';
import socket from './slices/socket';

const rootReducer = combineReducers({
  entities,
  auth,
  socket,
});

export default rootReducer;
