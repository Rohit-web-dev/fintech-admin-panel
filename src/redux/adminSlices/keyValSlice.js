import { createSlice } from "@reduxjs/toolkit";

export const keyValSlice = createSlice({
  name: 'keyValSlice',
  initialState: {
    data: [],
    url: "http://srvtechservices.com/exp-app/backend/api",
    // url: "http://localhost/fintech-app/api",
  },
  reducers: {
    keyValset: (state, action) => {
      state.data = action.payload
      //console.log(state.data)
      return state
    },
  }
})

export const { keyValset } = keyValSlice.actions
export default keyValSlice.reducer