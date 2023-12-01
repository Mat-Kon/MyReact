import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formSlice from "./slices/formSlice";
import countriesSlice from "./slices/countriesSlice";
import imgSlice from "./slices/imgSlice";

export const rootReducer = combineReducers({
  form: formSlice,
  countries: countriesSlice,
  img: imgSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;