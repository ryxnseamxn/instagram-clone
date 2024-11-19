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
            <button onClick={handleSubmit}>
                Unfollow
            </button>
        </div>
    )
}

export default Unfollow; 