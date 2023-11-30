import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormData } from '../../types/types';

interface FormState {
  form: IFormData | null;
}

const initialState: FormState = {
  form: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<IFormData>) => {
      state.form = action.payload;
    },
  },
});

export const { setForm } = formSlice.actions;
export default formSlice.reducer;