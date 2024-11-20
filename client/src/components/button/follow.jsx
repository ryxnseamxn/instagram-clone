import React from "react";

const Follow = ({ username, onUpdate }) => {
    const handleSubmit = async () => {
        await fetch(`http://localhost:8000/follow/${username}`, {
            method: 'POST',
            credentials: 'include'
        });
        onUpdate(); 
    }
    return (
        <div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSubmit}>
                Follow
            </button>
        </div>
    )
}

export default Follow; 