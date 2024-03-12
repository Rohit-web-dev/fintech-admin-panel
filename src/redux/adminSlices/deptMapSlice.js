import { createSlice } from "@reduxjs/toolkit";

export const deptMapSlice = createSlice({
  name: 'deptMapSlice',
  initialState: {
    parents: [],
    childs: [],
    parentData: "",
    childData: "",
    list: []
  },
  reducers: {
    setDeptMapSlice: (state, action) => {
      state.parents = action.payload
      state.childs = action.payload
      //console.log(state.parents)
      return state
    },

    setDeptData: (state, action) => {
      state = action.payload
      return state
    },

    getDeptData: (state, action) => {
      state.list = action.payload
      // console.log(state.list);
      return state
    },

    deleteDeptMapSlice: (state, action) => {
      state.list = state.list.filter(i => i.id !== action.payload)
      return state
    },
  }
})

export const { setDeptMapSlice, setDeptData, getDeptData, deleteDeptMapSlice } = deptMapSlice.actions
export default deptMapSlice.reducer 