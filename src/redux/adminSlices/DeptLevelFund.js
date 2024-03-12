import { createSlice } from "@reduxjs/toolkit";

export const DeptLevelFund = createSlice({
  name: 'DeptLevelFund',
  initialState: {
    totalFund: "",
    investedFund: "",
    remFund: "",
    name:"",
  },
  reducers: {
    
    setDeptLevelFunds: (state, action) => {
      state = action.payload
      console.log(state)
      state.totalFund=action.payload.totalUpperLimit;
      state.investedFund=action.payload.alreadyInvestedLimit;
      state.remFund=action.payload.rem;
      state.name=action.payload.name;
      return state
    },
  
  }
})

export const { setDeptLevelFunds } = DeptLevelFund.actions
export default DeptLevelFund.reducer