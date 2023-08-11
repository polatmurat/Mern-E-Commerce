import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";




const productService = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/',
        prepareHeaders: (headers, {getState}) => {
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
                }
            })
        }
    }
})

export const {useCreateProductMutation} = productService;
export default productService;