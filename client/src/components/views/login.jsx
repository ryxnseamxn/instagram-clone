import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; 
import { UserCircle, KeyRound, LogIn } from 'lucide-react';

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false); 
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 

    if(loggedIn){
        return <Navigate to="/profile"/>
    }    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST', 
                credentials: 'include',  
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, 
                    password 
                })
            });
            
            if(response.ok) {
                setLoggedIn(true); 
            } else {
                alert('Login failed!');
                window.location.reload();
            }
        } catch(err) {
            console.error("Error logging in", err); 
            alert('An error has occurred'); 
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Instagram</h1>
                    <p className="text-gray-600">Welcome back! Please log in to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label 
                            htmlFor="username" 
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserCircle className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <KeyRound className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <LogIn className="w-5 h-5" />
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;