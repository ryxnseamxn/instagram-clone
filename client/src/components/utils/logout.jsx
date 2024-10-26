import React from 'react';

const Logout = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/logout', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'withCredentials': 'true'
                },
                body: document.cookie
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            // Handle successful logout (e.g., redirecting the user or clearing user state)
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
