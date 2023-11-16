import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'searchValue',
  initialState: {
    value: localStorage.getItem('searchValue') ?? '',
  },
  reducers: {
    updateSearch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateSearch } = searchSlice.actions;
export default searchSlice.reducer;
