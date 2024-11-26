import React from "react";
import Navbar from "../navbar/navbar";
import { FrownIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-sm mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
                    <FrownIcon className="w-20 h-20 text-gray-400 mb-6" />
                    
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">
                        Page Not Found
                    </h1>
                    
                    <p className="text-gray-600 mb-8">
                        Sorry, the page you're looking for doesn't exist.
                    </p>
                    
                    <Link 
                        to="/feed"
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 
                                 text-white rounded-lg transition-colors
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Return to Feed
                    </Link>
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default NotFound;