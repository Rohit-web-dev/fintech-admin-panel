import { createSlice } from "@reduxjs/toolkit";

export const deptAddSlice = createSlice({
  name: 'deptAddSlice',
  initialState: {
    id: "",
    name: "",
    is_top: "",
    sdesc: "",
    ldesc: "",
    limit: "",
    allData: [],
  },
  reducers: {
    setDeptSlice: (state, action) => {
      state = action.payload
      return state
      console.log(state)
    },

    getDeptSlice: (state, action) => {
      state.allData = action.payload
      //console.log(state.allData)
      return state
    },

    deleteDeptSlice: (state, action) => {
      state.allData = state.allData.filter(i => i.id !== action.payload)
      return state
    },
  }
})

export const { setDeptSlice, getDeptSlice, deleteDeptSlice } = deptAddSlice.actions
export default deptAddSlice.reducer 