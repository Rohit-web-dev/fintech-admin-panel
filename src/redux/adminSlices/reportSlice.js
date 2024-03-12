import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
    name: 'reportSlice',
    initialState: {
        list: [],

    },
    reducers: {
        setChildReportTransaction: (state, action) => {
            state.list = action.payload;
            // console.log( action.payload)
            return state
        },
    }
})

export const { setChildReportTransaction } = reportSlice.actions
export default reportSlice.reducer