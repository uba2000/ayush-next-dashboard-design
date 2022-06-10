import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showNewProject: false,

  showEditArticle: false,

  toEditArticle: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setShowNewProject: (state, action) => {
      state.showNewProject = action.payload;
    },
    setShowEditArticle: (state, action) => {
      state.showEditArticle = action.payload;
    },
    setToEditArticle: (state, action) => {
      state.toEditArticle = action.payload;
    },
  },
});

export default layoutSlice.reducer;
export const { setShowNewProject, setShowEditArticle, setToEditArticle } =
  layoutSlice.actions;
