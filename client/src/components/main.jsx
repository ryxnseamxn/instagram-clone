import React from 'react'; 
import { Routes, Route } from 'react-router-dom';
import Home from './views/home';
import Debug from './views/debug';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/debug' element={<Debug />}></Route>
        </Routes>
    )
}

export default Main; 