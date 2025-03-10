import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ['getAllConsumer', 'getConsumer'],
  endpoints: (builder) => ({
    registerConsumer: builder.mutation<any, any>({
      query: (obj) => ({
        url: '/consumer/register',
        method: 'POST',
        body: obj,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ['getAllConsumer'],
    }),
    getAllConsumers: builder.query<any, any>({
      query: (obj) => ({
        url: `/consumer/get-all?query=${obj.query}&page=${obj.page}`,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
      }),
      providesTags: ['getAllConsumer'],
    }),
    getForSearchUser: builder.query<any, any>({
      query: () => ({
        url: `/consumer/get-search`,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
      }),
      providesTags: ['getAllConsumer'],
    }),
    deleteConsumer: builder.mutation<any, any>({
      query: (id) => ({
        url: '/consumer/delete/' + id,
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ['getAllConsumer'],
    }),
    getConsumers: builder.query<any, any>({
      query: (id) => ({
        url: '/consumer/get/' + id,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
      }),
      providesTags: ['getConsumer'],
    }),
    updateConsumer: builder.mutation<any, any>({
      query: ({ data, id }) => ({
        url: '/consumer/update/' + id,
        method: 'PATCH',
        body: data,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ['getAllConsumer', 'getConsumer'],
    }),
    dashboardData: builder.query<any, any>({
      query: () => ({
        url: '/consumer/dashboard/',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
      }),
    }),
  }),
});

export const {
  useRegisterConsumerMutation,
  useGetAllConsumersQuery,
  useDeleteConsumerMutation,
  useGetConsumersQuery,
  useUpdateConsumerMutation,
  useGetForSearchUserQuery,
  useDashboardDataQuery,
} = UserApi;
