import { createSlice } from "@reduxjs/toolkit";

export const empCrudSlice = createSlice({
  name: 'empCrudSlice',
  initialState: {
    deptList: []
  },
  reducers: {
    getDeptData: (state, action) => {
      state = action.payload
      return state
    },
  }
})

export const { getDeptData } = empCrudSlice.actions
export default empCrudSlice.reducer 