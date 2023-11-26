'use client';
import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import searchSlice from './searchSlice';
import detailSlice from './detailSlice';
import loadingSlice from './loadingSlice';
import quantitySlice from './quantitySlice';
import routerSlice from './routerSlice';
import { swapApi } from '../api/api';
import { createWrapper } from 'next-redux-wrapper';

export const rootReducer = combineReducers({
  items: itemsReducer,
  search: searchSlice,
  detail: detailSlice,
  loading: loadingSlice,
  quantity: quantitySlice,
  routed: routerSlice,
  [swapApi.reducerPath]: swapApi.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(swapApi.middleware),
  });

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

export const wrapper = createWrapper<RootStore>(makeStore);
