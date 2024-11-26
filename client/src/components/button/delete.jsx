import React from "react";

const Delete = ({ postId, onUpdate }) => {
    const handleSubmit = async () => {
        await fetch(`http://localhost:8000/delete/${postId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        onUpdate(); 
    }
    return (
        <div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSubmit}>
                Delete Post
            </button>
        </div>
    )
}

export default Delete; 