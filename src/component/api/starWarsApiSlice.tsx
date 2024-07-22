import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StarWarsEntity } from './dataInterface';

export type SearchResponse = {
  results: StarWarsEntity[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    searchEntities: builder.query<StarWarsEntity, { root: string, search: string, page: string }>({
      query: ({ root, search, page }) => `${root}/?search=${search}&page=${page}`,
    }),
    getEntityDetails: builder.query<StarWarsEntity, { root: string, id: string }>({
      query: ({ root, id }) => `${root}/${id}/`,
    }),
  }),
});

export const { useGetEntityDetailsQuery, useSearchEntitiesQuery } = starWarsApi;