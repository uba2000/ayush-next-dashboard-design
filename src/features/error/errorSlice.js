import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showErrorDialog: false,
  errorDetails: { type: '' },
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setShowErrorDialog: (state, action) => {
      state.showErrorDialog = action.payload;
      if (!action.payload) {
        state.errorDetails = { type: '' };
      }
    },
    setErrorDetails: (state, action) => {
      state.errorDetails = action.payload || { type: '' };
    },
  },
});

export default errorSlice.reducer;
export const { setShowErrorDialog, setErrorDetails } = errorSlice.actions;
