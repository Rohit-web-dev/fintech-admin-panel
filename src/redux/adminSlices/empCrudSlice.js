import { createSlice } from "@reduxjs/toolkit";

export const empCrudSlice = createSlice({
  name: 'empCrudSlice',
  initialState: {
    AllDept: [],
    AllEmpRole: [],
    Level: [],
  },
  reducers: {
    setAllDeptForCrud: (state, action) => {
      state.AllDept = action.payload
      return state
    },

    setempRolSliceForCrud: (state, action) => {
      state.AllEmpRole = action.payload
      return state
    },

    setLevelSliceForCrud: (state, action) => {
      state.Level = action.payload
      return state
    },
  }
})

export const { setAllDeptForCrud, setempRolSliceForCrud, setLevelSliceForCrud } = empCrudSlice.actions
export default empCrudSlice.reducer 