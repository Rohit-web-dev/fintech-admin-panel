import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    email: "",
    password: "",
    confirmPassword: "",
    otp: '',
    token: "",

  },
  reducers: {
    setUserSlice: (state, action) => {
      state = action.payload
      return state
    },
    setToken: (state, action) => {
      state.token = action.payload
      return state
    },
    getUserDetailsSlice: (state, action) => {
      state = action.payload
      return state
    },
  }
})

export const { setUserSlice, getUserDetailsSlice, setToken } = authSlice.actions
export default authSlice.reducer