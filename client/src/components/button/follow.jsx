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
            <button onClick={handleSubmit}>
                Follow
            </button>
        </div>
    )
}

export default Follow; 