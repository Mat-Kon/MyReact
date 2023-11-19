import { combineReducers, configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import searchSlice from './searchSlice';
import detailSlice from './detailSlice';
import { swapApi } from '../api/api';
import loadingSlice from './loadingSlice';

export const rootReducer = combineReducers({
  items: itemsReducer,
  search: searchSlice,
  detail: detailSlice,
  loading: loadingSlice,
  [swapApi.reducerPath]: swapApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(swapApi.middleware);
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
