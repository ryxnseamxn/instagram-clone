import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, UserCircle, PlusSquare, LogOut } from 'lucide-react';

const Navbar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="max-w-xl mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    <Link 
                        to="/feed" 
                        className="flex flex-col items-center text-gray-700 hover:text-gray-900"
                    >
                        <Home className="w-6 h-6" />
                        <span className="text-xs mt-1">Home</span>
                    </Link>

                    <Link 
                        to="/search" 
                        className="flex flex-col items-center text-gray-700 hover:text-gray-900"
                    >
                        <Search className="w-6 h-6" />
                        <span className="text-xs mt-1">Search</span>
                    </Link>

                    <Link 
                        to="/post" 
                        className="flex flex-col items-center text-gray-700 hover:text-gray-900"
                    >
                        <PlusSquare className="w-6 h-6" />
                        <span className="text-xs mt-1">Add Post</span>
                    </Link>

                    <Link 
                        to="/profile" 
                        className="flex flex-col items-center text-gray-700 hover:text-gray-900"
                    >
                        <UserCircle className="w-6 h-6" />
                        <span className="text-xs mt-1">Profile</span>
                    </Link>

                    <Link 
                        to="/logout" 
                        className="flex flex-col items-center text-gray-700 hover:text-gray-900"
                    >
                        <LogOut className="w-6 h-6" />
                        <span className="text-xs mt-1">Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;