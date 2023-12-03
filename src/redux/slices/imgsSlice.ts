import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface formState {
  img: string[],
}

const initialState: formState = {
  img: [],
};

const imgSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setImg: (state, action: PayloadAction<string>) => {
      state.img = [action.payload, ... state.img];
    },
  },
});

export const { setImg } = imgSlice.actions;
export default imgSlice.reducer;