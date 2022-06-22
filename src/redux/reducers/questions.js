import { createSlice } from "@reduxjs/toolkit";

const defaultSlice = createSlice({
    name: 'QUESTIONS',
    initialState: {
        questionCount: {
            totalCountOfQuestions: 0,
            countOfRightQuestions: 0,
            countOfWrongQuestions: 0,
        }
    },
    reducers: {
        setQuestionsReducer(state, action) {
            return {...state, questionCount: action.payload};
        },
    },
});

export const {setQuestionsReducer} = defaultSlice.actions;

export default defaultSlice.reducer;