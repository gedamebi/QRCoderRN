import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../databases/realTimeDataBase';


export const eventosApi = createApi({
  reducerPath: "eventosApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getEventos: builder.query({
      query: () => `eventos.json`,
    }),
  }),
});

export const { useGetEventosQuery } = eventosApi;