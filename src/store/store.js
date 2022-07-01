import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

import projectReducer from '../features/project/projectSlice';
import layoutReducer from '../features/layout/layoutSlice';
import errorReducer from '../features/error/errorSlice';

const combinedReducer = combineReducers({
  project: projectReducer,
  layout: layoutReducer,
  error: errorReducer,
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
        projectPage: {
          articles: [...action.payload.project.projectPage.articles],
          keywordList: [...action.payload.project.projectPage.keywordList],
          project: action.payload.project.projectPage.project,
        },
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore);
