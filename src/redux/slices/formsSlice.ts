import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormData } from '../../types/types';

interface FormState {
  form: IFormData[];
}

const initialState: FormState = {
  form: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<IFormData>) => {
      state.form = [action.payload, ...state.form];
    },
  },
});

export const { setForm } = formSlice.actions;
export default formSlice.reducer;