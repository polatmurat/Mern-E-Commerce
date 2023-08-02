import { configureStore } from '@reduxjs/toolkit';
import authService from '../features/auth/authService';
import authReducer from './reducers/authReducer';


export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    "authReducer": authReducer 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authService.middleware), // RTK-Query Middleware ekleme

});