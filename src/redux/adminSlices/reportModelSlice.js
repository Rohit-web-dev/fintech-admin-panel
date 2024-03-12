import { createSlice } from "@reduxjs/toolkit";

export const reportModelSlice = createSlice({
    name: 'reportModelSlice',
    initialState: {
        id: "1",
        status_type:"",
        page_type:"",

    },
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
            // console.log( action.payload)
            return state
        },
        setType: (state, action) => {
            state.status_type = action.payload;
            // console.log( action.payload)
            return state
        },
        setPageType: (state, action) => {
            state.page_type = action.payload;
            // console.log( action.payload)
            return state
        },
    }
})

export const { setId , setType,setPageType} = reportModelSlice.actions
export default reportModelSlice.reducer