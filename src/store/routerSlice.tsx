'use client';
import { createSlice } from '@reduxjs/toolkit';

const routerSlice = createSlice({
  name: 'loading',
  initialState: {
    isRouted: false,
  },
  reducers: {
    setRouted: (state, action) => {
      state.isRouted = action.payload;
    },
  },
});

export const { setRouted } = routerSlice.actions;
export default routerSlice.reducer;
