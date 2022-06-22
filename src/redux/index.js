import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import quizzesReducer from "./reducers/quizzes";
import questionsReducer from "./reducers/questions";
import timeReducer from "./reducers/time";


export default configureStore({
  reducer: {
      quizzes: quizzesReducer,
      questions: questionsReducer,
      time: timeReducer,
  },
  middleware: [...getDefaultMiddleware({ immutableCheck: false })],
});