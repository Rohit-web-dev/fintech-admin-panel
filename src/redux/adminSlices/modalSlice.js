import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState: {
    status: false,
    modelNo:0,
  },
  reducers: {
    getModalStatus: (state, action) => {
      state.status = action.payload;
     // console.log( action.payload)
      return state
    },

    setModalNo: (state, action) => {
        state.modelNo = action.payload;
       // console.log( action.payload)
        return state
      },
  }
})

export const { getModalStatus,setModalNo } = modalSlice.actions
export default modalSlice.reducer