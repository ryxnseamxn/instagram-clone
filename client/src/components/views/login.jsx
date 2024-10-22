import React, { useEffect, useState } from 'react';
let Login = () => {
    return (
        <form action="http://localhost:8000/login" method="post">
            <label htmlFor='username'>Username</label>
            <input
            name="username"
            id="username"
            type="text"
            />
            <label htmlFor='password'>Password</label>
            <input 
            name="password"
            id="password"
            type="text"
            />
            <input type="submit" value="Login"/>
        </form>
    )
}

export default Login; 