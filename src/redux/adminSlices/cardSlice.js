import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: 'cardSlice',
  initialState: {
    totalFund: "",
    investedFund: "",
    remFund: "",
    name:"",
  },
  reducers: {
    
    setFunds: (state, action) => {
      state = action.payload
      //console.log(state)
      state.totalFund=action.payload.totalUpperLimit;
      state.investedFund=action.payload.alreadyInvestedLimit;
      state.remFund=action.payload.rem;
      state.name=action.payload.name;
      return state
    },
  
  }
})

export const { setFunds } = cardSlice.actions
export default cardSlice.reducer