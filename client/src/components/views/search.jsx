import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import { Search } from 'lucide-react';

function SearchPage() {
    const [input, setInput] = useState(''); 
    const [users, setUsers] = useState([]); 

    useEffect(() => {
        const fetchUsers = async () => {
            if (input.trim() === '') {
                setUsers([]); 
                return;
            }

            try {
                const results = await fetch('http://localhost:8000/search?searchInput=' + input, {
                    credentials: "include",
                    method: 'GET',
                }); 
                const json = await results.json();
                setUsers(json);
            } catch (err) {
                console.log(err); 
                alert('An error has occurred');
            }
        };

        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [input]);

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-sm mx-auto px-4 py-8">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-xl font-semibold">Search</h1>
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="border-t border-gray-200">
                    {users.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <Link 
                                    key={index}
                                    to={`/user/${user.username}`}
                                    className="block py-4 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <div className="flex items-center px-2">
                                        <div className="ml-2">
                                            <span className="font-semibold text-gray-900 hover:text-gray-600">
                                                {user.username}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        input.trim() !== '' && (
                            <div className="flex items-center justify-center h-32">
                                <p className="text-gray-400">No users found</p>
                            </div>
                        )
                    )}
                </div>
            </div>
            <Navbar />
        </div>
    );
}

export default SearchPage;