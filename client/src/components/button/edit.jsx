import React from "react";

const Edit = ({ postId, onUpdate }) => {
    const handleSubmit = async () => {
        const newCaption = window.prompt('New caption:');
        console.log(postId);
        if (newCaption) {
            await fetch(`http://localhost:8000/update/${postId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ caption: newCaption }) // Send the new caption
            });
            onUpdate(); // Trigger parent update logic
        }
    };

    return (
        <div>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleSubmit}
            >
                Edit Post
            </button>
        </div>
    );
};

export default Edit;
