import { createSlice } from '@reduxjs/toolkit';
import { Items } from '../types/types';

const initialState: Items = [];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.length = 0;
      state.push(...action.payload.items);
    },
  },
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;
