import { createSlice } from "@reduxjs/toolkit";

const defaultSlice = createSlice({
    name: 'QUIZZES',
    initialState: {
        count: 0
    },
    reducers: {
        setQuizzesReducer(state, action) {
            return {...state, count: action.payload};
        },
    },
});

export const {setQuizzesReducer} = defaultSlice.actions;

export default defaultSlice.reducer;
