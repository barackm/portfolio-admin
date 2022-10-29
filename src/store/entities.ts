import { combineReducers } from '@reduxjs/toolkit';
import projects from './slices/projects';
import ui from './slices/ui';
import projectCategories from './slices/projectCategories';

const entites = combineReducers({
  ui,
  projects,
  projectCategories,
});

export default entites;
