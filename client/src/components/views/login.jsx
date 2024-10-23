import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; 

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false); 
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 

    if(loggedIn){
        return <Navigate to="/profile"/>
    }    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, 
                    password 
                })
            })
            if(response.ok){
                setLoggedIn(true); 
            }else{
                alert('Login failed!');
                window.location.reload();
            }
        }catch(err){
            console.error("Error logging in", err); 
            alert('An error has occured'); 
        }
    }

    return (
        <form onSubmit={ handleSubmit }>
            <label htmlFor='username'>Username</label>
            <input
            id="username"
            type="text"
            value={ username }
            onChange={(e) => setUsername(e.target.value)}
            required
            />
            <label htmlFor='password'>Password</label>
            <input 
            id="password"
            type="text"
            password = { password }
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <input type="submit" value="Login"/>
        </form>
    )
}

export default Login; 