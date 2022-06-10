import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import projectReducer from '../features/project/projectSlice';
import layoutReducer from '../features/layout/layoutSlice';

const combinedReducer = combineReducers({
  project: projectReducer,
  layout: layoutReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
  });

export const wrapper = createWrapper(makeStore);
