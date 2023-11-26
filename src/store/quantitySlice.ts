'use client';
import { createSlice } from '@reduxjs/toolkit';

const quantitySlice = createSlice({
  name: 'quantity',
  initialState: {
    value: 10,
  },
  reducers: {
    setQuantity: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
