import { createSlice } from "@reduxjs/toolkit";

export const ExpencePolisyListSlice = createSlice({
  name: 'ExpencePolisyListSlice',
  initialState: {
    list: []
  },
  reducers: {
    SetPolicyList: (state, action) => {
      state.list = action.payload
      console.log(state.list)
      return state

    },
  }
})

export const { SetPolicyList } = ExpencePolisyListSlice.actions
export default ExpencePolisyListSlice.reducer 