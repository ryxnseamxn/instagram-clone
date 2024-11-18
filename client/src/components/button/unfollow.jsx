import React from "react";

const Unfollow = ({ username }) => {
    const handleSubmit = async () => {
        await fetch(`http://localhost:8000/unfollow/${username}`, {
            method: 'POST',
            credentials: 'include'
        });
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