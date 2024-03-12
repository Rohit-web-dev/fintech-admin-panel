import { createSlice } from "@reduxjs/toolkit";

export const deptLevelList = createSlice({
  name: 'deptLevelList',
  initialState: {
    Levellist:[],
  },
  reducers: {
    
    setLevelList: (state, action) => {
      state = action.payload
      console.log(state)
      state.Levellist=action.payload;
      return state
    },
  
  }
})

export const { setLevelList } = deptLevelList.actions
export default deptLevelList.reducer