import { createSlice } from "@reduxjs/toolkit";

export const cardlistSlice = createSlice({
  name: 'cardlistSlice',
  initialState: {
    cardList:[],
  },
  reducers: {
    
    setList: (state, action) => {
      state = action.payload
      //console.log(state)
      state.cardList=action.payload;
      return state
    },
  
  }
})

export const { setList } = cardlistSlice.actions
export default cardlistSlice.reducer