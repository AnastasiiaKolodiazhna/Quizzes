import React from 'react';
import { useNavigate } from "react-router-dom";
import './home.css';
import Button from '@mui/material/Button';
import {ROUTES} from '../../env/routes'

function Home() {
    const navigate = useNavigate();

    return (
        <div className='home-page'>
           <h2>Make your <span>choice</span>.</h2>
           <div className='button-container'>
                <Button variant="contained" onClick={() => navigate(ROUTES.LIST_OF_QUIZZES)}>Pass a Test</Button>
            </div>
        </div>
    );
}

export default Home;
