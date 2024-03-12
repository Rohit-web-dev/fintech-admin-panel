import { createSlice } from "@reduxjs/toolkit";

export const AdminUpdateSlice = createSlice({
  name: 'AdminUpdateSlice',
  initialState: {
    admin_id:"",
  },


  reducers: {
    setAdminId: (state, action) => {
      state.admin_id = action.payload
      return state
    },

  }
})


export const { setAdminId } = AdminUpdateSlice.actions
export default AdminUpdateSlice.reducer