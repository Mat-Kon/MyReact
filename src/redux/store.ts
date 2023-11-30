import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formSlice from "./slices/formSlice";

export const rootReducer = combineReducers({
  form: formSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;