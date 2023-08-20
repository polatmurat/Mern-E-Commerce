import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode';

const customerToken = localStorage.getItem('user-token');

const verifyToken = (keyName) => {

  const storage = localStorage.getItem(keyName);

  if (storage) {
    const decodeToken = jwtDecode(storage);
    const expiresIn = new Date(decodeToken.exp * 1000);

    if (new Date() > expiresIn) {
      localStorage.removeItem(keyName);
      return null;
    } else {
      return storage; // Return the token if it's valid
    }

  } else {
    return null;
  }
}


const authReducer = createSlice({
  name: 'authReducer',
  initialState: {
    adminToken: verifyToken('admin-token'),
    userToken: verifyToken('user-token'),
    user: customerToken ? jwtDecode(customerToken) : null
  },

  reducers: {
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      state.user = jwtDecode(action.payload);
    },
    logout: (state) => {
      localStorage.removeItem('admin-token')
      state.adminToken = null
    }
  }
});

export const { setAdminToken, setUserToken, logout } = authReducer.actions;

export default authReducer.reducer;