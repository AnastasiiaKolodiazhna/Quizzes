import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './list-of-quizzes.css';
import Button from '@mui/material/Button';
import Avarar1 from '../../img/avatar1.svg';
import Avarar2 from '../../img/avatar2.svg';
import Avarar3 from '../../img/avatar3.svg';
import { getCategories } from '../../api/questions';
import Loader from '../../components/loader/index';
import {ROUTES} from '../../env/routes'

const images = [Avarar1, Avarar2, Avarar3];
const colors = ['#3545E9', '#FEFD54', '#63C995', '#E23D69'];

function ListOfQuizzes() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true)
            const response = await getCategories();
            const shuffleCategories = response.trivia_categories.sort(() => Math.random() - 0.5)
            const updatedCategories = shuffleCategories.slice(0, 10).map((categoty, index) => ({
                ...categoty,
                questionsCount: Math.floor(Math.random() * 10) + 5,
                image: images[index % images.length],
                backgroundColor: colors[index % colors.length]
            }))
            setCategories(updatedCategories);
            setLoading(false)
        })()
    }, [])

    return (
        <div className='list-of-quizzes'>
            {loading ?
                <Loader /> :
                <>
                    <h2>Choose your <span>Quiz</span>.</h2>
                    <div className='quizz-cards'>
                        {categories.map((category, index) => (
                            <div
                                onClick={() => navigate(`${ROUTES.QUIZZ}${index}`, { state: { card: category } })}
                                className='quizz-card'
                                key={index}
                            >
                                <div className='quizz-card-inner'>
                                    <div
                                        className='quizz-card-front'
                                        style={{
                                            backgroundColor: category.backgroundColor,
                                            color: category.backgroundColor === '#FEFD54' ? '#000' : '#FFF',
                                        }}
                                    >
                                        <div>
                                            <div className='card-header'>
                                                <span>{category?.questionsCount} Questions</span>
                                                <img src={category.image} alt='Category avatar'/>
                                            </div>
                                            <div className='title'>{category.name}</div>
                                        </div>
                                    </div>
                                    <div
                                        className='quizz-card-back'
                                        style={{
                                            backgroundColor: category.backgroundColor,
                                            color: category.backgroundColor === '#FEFD54' ? '#000' : '#FFF',
                                        }}
                                    >
                                        <div>
                                            <img src={category.image} alt='Category avatar'/>
                                            <div className='title'>Play now!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='button-container'>
                        <Button variant='contained' onClick={() => navigate(`${ROUTES.QUIZZ}${Math.floor(Math.random() * categories.length)}`, { state: { card: categories[Math.floor(Math.random() * categories.length)] } })}>I`m lucky</Button>
                    </div>
                </>
            }
        </div>
    );
}

export default ListOfQuizzes;
