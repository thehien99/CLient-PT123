import { createSlice } from "@reduxjs/toolkit";
const authReducer = createSlice({
  name: "auth",
  initialState: {
    token: null,
    message: "",
    loading: false,
    error: false,
    isLogin: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action.payload)
      localStorage.setItem('token', action.payload)
      state.isLogin = localStorage.getItem('token') && true
    },
    loginFailed: (state, action) => {
      state.token = null;
      state.message = action.payload;
      state.isLogin = false
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.token = localStorage.removeItem('token')
      state.isLogin = false
    },
    registerSuccess: (state, action) => {
      state.token = action.payload;
      state.isLogin = true
    },
    registerFailed: (state) => {
      state.isLogin = false
    }
  },
});

export const { loginFailed, loginSuccess, logoutSuccess, registerSuccess, registerFailed } = authReducer.actions;

export default authReducer.reducer;
