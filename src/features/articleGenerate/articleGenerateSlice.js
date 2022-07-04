import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fromSaved: false,
  savedGeneratedArticles: false,
};

const articleGenerateSlice = createSlice({
  name: 'articleGenrate',
  initialState,
  reducers: {
    saveGeneratedArticles: (state, action) => {
      state.savedGeneratedArticles = action.payload.articles;
      state.fromSaved = action.payload.ifSaved;
    },
  },
});

export default articleGenerateSlice.reducer;
export const { saveGeneratedArticles } = articleGenerateSlice.actions;
