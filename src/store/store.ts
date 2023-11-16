import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import searchSlice from './searchSlice';
import detailSlice from './detailSlice';
import { swapApi } from '../api/api';
import loadingSlice from './loadingSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    search: searchSlice,
    detail: detailSlice,
    loading: loadingSlice,
    [swapApi.reducerPath]: swapApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(swapApi.middleware);
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
