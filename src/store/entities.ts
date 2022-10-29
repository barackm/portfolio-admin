import { combineReducers } from '@reduxjs/toolkit';
import projects from './slices/projects';
import ui from './slices/ui';

const entites = combineReducers({
  ui,
  projects,
});

export default entites;
