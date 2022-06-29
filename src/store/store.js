import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

import projectReducer from '../features/project/projectSlice';
import layoutReducer from '../features/layout/layoutSlice';

const combinedReducer = combineReducers({
  project: projectReducer,
  layout: layoutReducer,
});

const masterReducer = (state, action) => {
  if (action.type == HYDRATE) {
    const nextState = {
      ...state,
      project: {
        ...state.project,
        projects: [
          ...action.payload.project.projects,
          // ...state.project.projects,
        ],
      },
    };
    console.log('server', nextState);
    return nextState;
  } else {
    console.log('client', state);
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore);
