import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: ['Georgia', 'Latvia', 'Canada'],
};

const countriesSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;