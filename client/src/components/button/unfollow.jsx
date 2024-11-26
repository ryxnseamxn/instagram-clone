import React from "react";

const Unfollow = ({ username, onUpdate }) => {
    const handleSubmit = async () => {
        await fetch(`http://localhost:8000/unfollow/${username}`, {
            method: 'POST',
            credentials: 'include'
        });
        onUpdate(); 
    }
    return (
        <div>
            <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={handleSubmit}
            >
                Unfollow
            </button>
        </div>
    )
}

export default Unfollow;