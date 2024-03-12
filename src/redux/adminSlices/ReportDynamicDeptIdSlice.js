
import { createSlice } from "@reduxjs/toolkit";

export const ReportDynamicDeptIdSlice = createSlice({
  name: 'ReportDynamicDeptIdSlice',
  initialState: {
    dept_id:"",
  },


  reducers: {
    setReportDynamicDeptId: (state, action) => {
      state.dept_id = action.payload
      return state
    },

  }
})


export const { setReportDynamicDeptId } = ReportDynamicDeptIdSlice.actions
export default ReportDynamicDeptIdSlice.reducer