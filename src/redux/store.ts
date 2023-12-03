import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formsSlice from "./slices/formsSlice";
import countriesSlice from "./slices/countriesSlice";
import imgSlice from "./slices/imgsSlice";

export const rootReducer = combineReducers({
  form: formsSlice,
  countries: countriesSlice,
  img: imgSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;