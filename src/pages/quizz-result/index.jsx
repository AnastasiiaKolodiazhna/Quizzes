import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './quizz-result.css';
import Button from '@mui/material/Button';
import { setQuizzesReducer } from "../../redux/reducers/quizzes";
import { setTimeReducer } from "../../redux/reducers/time";
import { setQuestionsReducer } from "../../redux/reducers/questions";
import { PieChart, Pie, Cell } from 'recharts';
import { ROUTES } from '../../env/routes';


function QuizzResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { count } = useSelector((state) => state?.quizzes);
    const { questionCount } = useSelector((state) => state?.questions);
    const { totalTime } = useSelector((state) => state?.time);

    const [countOfRightAnswers, setCountOfRightAnswers] = useState(0);

    const { answersInfo, questionsCount, totalSeconds } = location.state;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const allMinutes = Math.floor(totalTime / 60);
    const allSeconds = totalTime % 60;

    useEffect(() => {
        for (let prop in answersInfo) {
            answersInfo[prop].correct && setCountOfRightAnswers(prevState => prevState + 1);
        }
    }, [answersInfo])

    // It`s one of the way to store data. Probably it will be better to do via local/session storage.
    useEffect(() => {
        dispatch(setQuizzesReducer(count + 1));
        dispatch(setTimeReducer(totalTime + totalSeconds));
        // eslint-disable-next-line
    }, [answersInfo])

    useEffect(() => {
        if (countOfRightAnswers) {
            dispatch(setQuestionsReducer({
                ...questionCount,
                countOfRightQuestions: questionCount.countOfRightQuestions + countOfRightAnswers,
                countOfWrongQuestions: questionCount.countOfWrongQuestions - countOfRightAnswers,
            }))
        } else {
            dispatch(setQuestionsReducer({
                ...questionCount,
                totalCountOfQuestions: questionCount.totalCountOfQuestions + questionsCount,
                countOfWrongQuestions: questionCount.countOfWrongQuestions + questionsCount,
            }))
        }
        // eslint-disable-next-line
    }, [questionsCount, countOfRightAnswers])


    const data = [
        {
            value: count,
            color: '#3545E9',
            title: count,
            description: 'Quizzes were played'
        },
        {
            value: questionCount.totalCountOfQuestions,
            color: '#63C995',
            title: questionCount.totalCountOfQuestions,
            subtitle: <>
                        <span style={{color: 'green'}}>{questionCount.countOfRightQuestions} right </span>
                        <span style={{color: 'red'}}>{questionCount.countOfWrongQuestions} wrong</span>
                    </>,
            description: 'Questions have been answered'
        },
        {
            value: allMinutes + (allSeconds * 0.01),
            color: '#FEFD54',
            title: `${allMinutes} min ${allSeconds} sec`,
            description: `${Math.round(+allMinutes / +count)} min ${Math.round(+allSeconds / +count)} sec Average time of answering quizzes`
        },
    ];

    return (
        <div className='quizz-result-page'>
            <h2>Your Score <span>:</span></h2>
            <span className='score-count'>
                <span>{countOfRightAnswers}</span> <span>/ {questionsCount}</span>
            </span>
            <span className='time'>
                {minutes} min {seconds} sec
            </span>
            <p>
                Good try! Why not have another go? You might get a bigger score!
            </p>
            <div className='diagram-container'>
                <h2>My statistics</h2>
                <div>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={data}
                            innerRadius={70}
                            outerRadius={120}
                            dataKey="value"
                        >
                            {data.map((el, index) => (
                                <Cell key={`cell-${index}`} fill={el.color} />
                            ))}
                        </Pie>
                    </PieChart>
                    <div>
                        {data.map(el => (
                            <div className='descr'>
                                <div className='square' style={{ backgroundColor: el.color }}></div>
                                <span className='title'>{el.title} {el?.subtitle}</span>
                                <span>{el.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='button-container'>
                <Button variant="contained" onClick={() => navigate(ROUTES.LIST_OF_QUIZZES)}>Back to all Quizzes</Button>
            </div>
        </div>
    );
}

export default React.memo(QuizzResult);
