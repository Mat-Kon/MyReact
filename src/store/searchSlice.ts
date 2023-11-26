'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

const searchSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateSearch } = searchSlice.actions;
export default searchSlice.reducer;
