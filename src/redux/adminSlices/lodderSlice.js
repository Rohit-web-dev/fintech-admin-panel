import { createSlice } from "@reduxjs/toolkit";

export const lodderSlice = createSlice({
  name: 'lodderSlice',
  initialState: {
    status: false,
  },
  reducers: {
    getLodderStatus: (state, action) => {
      state.status = action.payload
      return state
    },
  }
})

export const { getLodderStatus } = lodderSlice.actions
export default lodderSlice.reducer