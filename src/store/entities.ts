import { combineReducers } from '@reduxjs/toolkit';
import ui from './slices/ui';

const entites = combineReducers({
  ui,
});

export default entites;
