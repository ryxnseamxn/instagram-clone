import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; 
import Navbar from '../navbar/navbar';

const Logout = () => {
    const [loggedOut, setLoggedOut] = useState(false); 

    if(loggedOut){
        return <Navigate to="/login" />
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            setLoggedOut(true); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <Navbar />
        </div>
    );
};

export default Logout;
