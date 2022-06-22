import { createSlice } from "@reduxjs/toolkit";

const defaultSlice = createSlice({
    name: 'TOTAL_TIME',
    initialState: {
        totalTime: 0
    },
    reducers: {
        setTimeReducer(state, action) {
            return {...state, totalTime: action.payload};
        },
    },
});

export const {setTimeReducer} = defaultSlice.actions;

export default defaultSlice.reducer;
