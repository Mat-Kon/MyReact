import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'Italy',
    'Brazil',
    'Spain',
    'China',
    'India',
    'Russia',
    'South Korea',
    'Netherlands',
    'Mexico',
    'Switzerland',
    'Sweden',
    'Norway',
    'Denmark'
  ],
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