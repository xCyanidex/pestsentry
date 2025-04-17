import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recordsApiSlice = createApi({
    reducerPath: 'recordsApi', 
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/records', 
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRecordsByUser: builder.query({
            query: (userId) => `/content/${userId}`,  // record query endpoint
            providesTags: ["Records"],
        }),
        getRecordById: builder.query({
            query: (recordId) => `/${recordId}`, 
        }),
        postRecords:builder.mutation({
            query: (formData)=>({
                url:'/',
                method:'POST',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ["Records"],
        }),
        updateRecord: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: updatedData,
            }),
        }),
        deleteRecord: builder.mutation({
            query: ( id ) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Records"],
        }),
    }),
});

export const {
    useGetRecordsByUserQuery,
    useGetRecordByIdQuery,
    usePostRecordsMutation,
    useUpdateRecordMutation,
    useDeleteRecordMutation,
} = recordsApiSlice;
