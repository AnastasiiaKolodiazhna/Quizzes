import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css';
import Header from './components/header/index';
import ListOfQuizzes from './pages/list-of-quizzes/index';
import SingleQuizz from './pages/single-quizz/index';
import QuizzResult from './pages/quizz-result/index';
import Home from './pages/home/index';
import {ROUTES} from './env/routes'

function App() {
  return (
    <div className='App'>
      <Header /> 
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />}/>
          <Route path={ROUTES.LIST_OF_QUIZZES} element={<ListOfQuizzes />} />
          <Route path={`${ROUTES.QUIZZ}:id`} element={<SingleQuizz />} />
          <Route path={`${ROUTES.QUIZZ_RESULT}:id`} element={<QuizzResult />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
