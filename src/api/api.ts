'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

const BASE_URL = 'https://swapi.dev/api/people';

export const swapApi = createApi({
  reducerPath: 'swapApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getItems: builder.query({
      query: (page: string | undefined) => `?page=${page ?? 1}`,
    }),
    searchItems: builder.query({
      query: (arg: { value: string; page: string | undefined }) =>
        `?search=${arg.value ?? ''}&page=${arg.page ?? ''}`,
    }),
    getByName: builder.query({
      query: (name: string) => `?search=${name}`,
    }),
  }),
});

export const {
  useGetItemsQuery,
  useSearchItemsQuery,
  useGetByNameQuery,
  util: { getRunningQueriesThunk },
} = swapApi;

export const { getByName, getItems, searchItems } = swapApi.endpoints;
