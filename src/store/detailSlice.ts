import { createSlice } from '@reduxjs/toolkit';

const detailSlice = createSlice({
  name: 'detail',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleDetail: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleDetail } = detailSlice.actions;
export default detailSlice.reducer;
