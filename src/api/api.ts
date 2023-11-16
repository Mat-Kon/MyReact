import { ICategory, IPeople, Result } from '../types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://swapi.dev/api/people';

export const swapApi = createApi({
  reducerPath: 'swapApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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

export const { useGetItemsQuery, useSearchItemsQuery, useGetByNameQuery } = swapApi;
