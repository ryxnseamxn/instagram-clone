import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; 
import Navbar from '../navbar/navbar';
import { LogOut } from 'lucide-react';

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
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-sm mx-auto px-4 py-8">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-xl font-semibold">Logout</h1>
                </div>

                <div className="flex flex-col items-center">
                    <div className="text-center mb-6">
                        <p className="text-gray-600">Are you sure you want to logout?</p>
                    </div>

                    <button 
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default Logout;