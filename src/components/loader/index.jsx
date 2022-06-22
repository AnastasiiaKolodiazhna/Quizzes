import React from 'react'
import { CircularProgress } from "@mui/material";


const Loader = () => {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.6)",
            zIndex: 1000
        }}>
            <CircularProgress style={{
                position: "absolute", 
                left: "50%", 
                top: "50%", 
                color: "white"
            }} />
        </div>
    )
}


export default Loader
