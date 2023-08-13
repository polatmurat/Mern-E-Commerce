import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";




const productService = createApi({
    reducerPath: 'products',
    tagTypes:'products',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/',
        prepareHeaders: (headers, { getState }) => {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            console.log(token);
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            createProduct: builder.mutation({
                query: (data) => {
                    return {
                        url: 'create-product',
                        method: 'POST',
                        body: data
                    }
                },
                invalidatesTags: ['products']
            }),
            getProducts: builder.query({
                query: (page) => {
                    return {
                        url: `products/${page}`,
                        method: 'GET'
                    }
                },
                providesTags: ['products']
            })
        }
    }
})

export const { useCreateProductMutation, useGetProductsQuery } = productService;
export default productService;