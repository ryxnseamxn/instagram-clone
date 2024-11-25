import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <Link to="/feed">Home</ Link>
            <Link to="/search">Search</Link>
            <Link to="/profile">Profile</ Link>
            <Link to="/post">Add Post</Link>
            <Link to="/logout">Logout</ Link>
        </div>
    )
}

export default Navbar