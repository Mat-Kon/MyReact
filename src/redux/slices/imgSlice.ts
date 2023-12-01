import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  img: '',
};

const imgSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setImg: (state, action: PayloadAction<string>) => {
      state.img = action.payload;
    },
  },
});

export const { setImg } = imgSlice.actions;
export default imgSlice.reducer;