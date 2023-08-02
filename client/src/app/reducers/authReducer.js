import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode';
const adminStorage = localStorage.getItem('admin-token');

const verifyToken = () => {
    if (adminStorage) {
      const decodeToken = jwtDecode(adminStorage);
      const expiresIn = new Date(decodeToken.exp * 1000);
      if (new Date() > expiresIn) {
        localStorage.removeItem('admin-token');
        return null;
      } else {
        return adminStorage; // Return the token if it's valid
      }
    } else {
      return null; // Return null if there is no token
    }
  }
  

const authReducer = createSlice({
    name: 'authReducer',
    initialState: {
        adminToken: verifyToken()
    },

    reducers: {
        setAdminToken: (state, action) => {
            state.adminToken = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('admin-token')
            state.adminToken = null
        }
    }
});

export const { setAdminToken, logout } = authReducer.actions;

export default authReducer.reducer;