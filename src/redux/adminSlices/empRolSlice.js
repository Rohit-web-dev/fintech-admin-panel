import { createSlice } from "@reduxjs/toolkit";

export const empRolSlice = createSlice({
  name: 'empRolSlice',
  initialState: {
    name: "",
    desc: "",
    list: [],
    allDatas: []
  },
  reducers: {
    setEmpRolData: (state, action) => {
      state = action.payload
      return state
    },

    getAllEmpRolData: (state, action) => {
      state.list = action.payload
      return state
    },

    deleteEmpRolSlice: (state, action) => {
      state.list = state.list.filter(i => i.id !== action.payload)
      return state
    },

  }
})

export const { setEmpRolData, getAllEmpRolData, deleteEmpRolSlice } = empRolSlice.actions
export default empRolSlice.reducer 