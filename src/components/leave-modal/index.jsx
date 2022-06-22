import React from 'react';
import { useNavigate } from "react-router-dom";
import './leave-modal.css';
import Button from '@mui/material/Button';
import { ROUTES } from '../../env/routes';


function LeaveModal({ open, setOpen }) {
    const navigate = useNavigate();

    return (
        <div className={`leave-modal-container ${open && 'leave-modal-container-open'}`}>
            <div className='leave-modal'>
                <h2>Leave quiz</h2>
                <span>Are you sure you want to exit and cancel the quiz? Your answers will not be saved.</span>
                <div className='buttons'>
                    <Button
                        variant="outlined"
                        style={{
                            textTransform: 'initial'
                        }}
                        onClick={() => setOpen(false)}
                    >
                        Back to quiz
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            textTransform: 'initial'
                        }}
                        onClick={() => navigate(ROUTES.LIST_OF_QUIZZES)}
                    >
                        Go on main page
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LeaveModal;
