import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StarWarsEntity, ResultType } from "./dataInterface";

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    searchEntities: builder.query<
      StarWarsEntity,
      { root: string; search: string; page: string }
    >({
      query: ({ root, search, page }) =>
        `${root}/?search=${search}&page=${page}`,
    }),
    getEntityDetails: builder.query<
      ResultType,
      { root: string; id: string }
    >({
      query: ({ root, id }) => `${root}/${id}/`,
    }),
  }),
});

export const { useGetEntityDetailsQuery, useSearchEntitiesQuery } = starWarsApi;
