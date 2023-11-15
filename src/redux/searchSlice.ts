import { createSlice } from '@reduxjs/toolkit';

const initialState: string = '';

const searchSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state = action.payload;
    },
  },
});

export const { updateSearch } = searchSlice.actions;
export default searchSlice.reducer;
