import { createSlice } from "@reduxjs/toolkit";

export const AdminDeptsSlice = createSlice({
  name: 'AdminDeptsSlice',
  initialState: {
    allAdminsDept:[],
    allAdmin:[],

  },
  reducers: {
    setAdminDept: (state, action) => {
      state.allAdminsDept = action.payload
      return state
    },

    setAdmins: (state, action) => {
      state.allAdmin = action.payload
      return state
    },
   
  }
})

export const { setAdminDept,setAdmins } = AdminDeptsSlice.actions
export default AdminDeptsSlice.reducer