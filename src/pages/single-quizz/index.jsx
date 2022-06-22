import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import './single-quizz.css';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import LeaveModal from '../../components/leave-modal/index'
import Loader from '../../components/loader/index'
import { getQuestions } from '../../api/questions';
import { ROUTES } from '../../env/routes';

function SingleQuizz() {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const card = location.state.card;

    let windowWidth = window.innerWidth;
    let isMobile = windowWidth < 768

    const [questions, setQuestions] = useState([]);
    const [answersInfo, setIsAnswersInfo] = useState({});
    const [questionNumber, setQuestionNumber] = useState(1);
    const [openLeaveModal, setOpenLeaveModal] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [loading, setLoading] = useState(false);

    const parser = new DOMParser();
    const decodedQuestion = questions[questionNumber - 1]?.question ? parser?.parseFromString(`<!doctype html><body>${questions[questionNumber - 1]?.question}`, 'text/html')?.body?.textContent : '';

    useEffect(() => {
        (async () => {
            setLoading(true)
            const response = await getQuestions(card?.questionsCount, card?.id);
            const updatedQuestions = response?.results?.map(question => {
                const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)
                return {
                    ...question,
                    answers: answers
                }
            });
            setQuestions(updatedQuestions);
            setLoading(false)
        })()
    }, [card])

    useEffect(() => {
        const interval = setInterval(() => {
            setTotalSeconds(t => t + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {loading ?
                <Loader /> :
                <div className='single-quizz'>
                    <h2>{card?.name}</h2>
                    <div
                        className='card'
                        style={{
                            backgroundColor: card?.backgroundColor,
                            color: card?.backgroundColor === '#FEFD54' ? '#000' : '#FFF',
                        }}
                    >
                        <div className='card-header'>
                            <span className='question-count'>
                                <span style={{ backgroundColor: card?.backgroundColor === '#FEFD54' ? '#E23D69' : '#FEFD54' }}>{questionNumber}</span> <span>/ {card?.questionsCount}</span>
                            </span>
                            <img src={card?.image} alt='Card avatar'/>
                        </div>
                        <span className='question'>{decodedQuestion}</span>
                        <div className='answers'>
                            {questions[questionNumber - 1]?.answers.map((answer, index) => (
                                <FormControlLabel
                                    value='end'
                                    key={index}
                                    control={
                                        <Radio
                                            checked={answersInfo[questionNumber]?.answer === answer}
                                            onChange={() => {
                                                setIsAnswersInfo({
                                                    ...answersInfo,
                                                    [questionNumber]: {
                                                        correct: answer === questions[questionNumber - 1]?.correct_answer,
                                                        answer: answer
                                                    }
                                                })
                                            }}
                                            sx={{
                                                color: 'white',
                                                '&.Mui-checked': {
                                                    color: pink[600],
                                                },
                                            }}
                                        />}
                                    style={{
                                        color: answersInfo[questionNumber]?.answer === answer ? '#FFF' : '#000'
                                    }}
                                    label={answer}
                                />
                            ))}
                        </div>
                        <div className='buttons'>
                            <Button
                                variant='outlined'
                                style={{
                                    color: card?.backgroundColor === '#FEFD54' ? '#E23D69' : '#FFF',
                                    border: '2px solid #969AB0',
                                    textTransform: 'initial'
                                }}
                                onClick={() => {
                                    questionNumber > 1 && setQuestionNumber(questionNumber - 1)
                                }}
                            >
                                &lt; {isMobile ? 'Prev' : 'Prev question'}
                            </Button>
                            <Button
                                variant='contained'
                                style={{
                                    textTransform: 'initial'
                                }}
                                onClick={() => {
                                    if (questionNumber < card?.questionsCount && answersInfo[questionNumber]) {
                                        setQuestionNumber(questionNumber + 1)
                                    } else if (questionNumber === card?.questionsCount) {
                                        navigate(`${ROUTES.QUIZZ_RESULT}${params?.id}`, {
                                            state: {
                                                answersInfo: answersInfo,
                                                questionsCount: card?.questionsCount,
                                                totalSeconds: totalSeconds,
                                            }
                                        })
                                    }
                                }}
                            >
                                {isMobile ? 'Next' : 'Next question'} &gt;
                            </Button>
                        </div>
                    </div>
                    <div className='button-container'>
                        <Button variant='contained' onClick={() => setOpenLeaveModal(!openLeaveModal)}>Back to all Quizzes</Button>
                    </div>
                    <LeaveModal open={openLeaveModal} setOpen={setOpenLeaveModal} />
                </div>
            }
        </>
    );
}

export default SingleQuizz;
