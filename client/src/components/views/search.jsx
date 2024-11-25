import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';


function SearchPage() {
    const [input, setInput] = useState(''); 
    const [users, setUsers] = useState([]); 

    // Remove handleSubmit since we don't need form submission anymore
    useEffect(() => {
        const fetchUsers = async () => {
            if (input.trim() === '') {
                setUsers([]); // Clear results if input is empty
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

        // Add debouncing to prevent too many API calls
        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 300); // Wait 300ms after last keystroke before fetching

        // Cleanup function to clear timeout
        return () => clearTimeout(timeoutId);
    }, [input]); // Run effect when input changes

    return (
        <div>
            {/* Remove form element since we don't need submission */}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search users..."
            />
            {users.length > 0 ?    
                users.map((user, index) => (
                    <div key={index}>
                        <Link to={`/user/${user.username}`}>
                            {user.username}
                        </Link>                        
                    </div>
                )) : (
                    <p>No Users Found</p>
                )
            }
            <Navbar /> 
        </div>
    )
}
export default SearchPage;
