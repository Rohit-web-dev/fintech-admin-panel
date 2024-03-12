import { createSlice } from "@reduxjs/toolkit";

export const masterReportSlice = createSlice({
    name: 'masterReportSlice',
    initialState: {
        list: [],

    },
    reducers: {
        setMasterReportList: (state, action) => {
            state.list = action.payload;
            // console.log( action.payload)
            return state
        },
    }
})

export const { setMasterReportList } = masterReportSlice.actions
export default masterReportSlice.reducer