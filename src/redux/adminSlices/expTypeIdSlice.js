import { createSlice } from "@reduxjs/toolkit";

export const expTypeIdSlice = createSlice({
  name: 'expTypeIdSlice',
  initialState: {
    exp_id: "",
  },


  reducers: {
    setExpId: (state, action) => {
      state.exp_id = action.payload
      return state
    },

  }
})


export const { setExpId } = expTypeIdSlice.actions
export default expTypeIdSlice.reducer