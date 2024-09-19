import React, { useState } from 'react';

const AddPostForm = () => {
    const [username, setUsername] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try{
            const response = await fetch('http://localhost:8000/addPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username
                }),
            })
            if (response.ok) {
                const data = await response.json();
                alert('post added successfully!');
              } else {
                alert('Error adding post.');
              }
        }catch(err){
            console.error('Error adding post', err);
            alert('An error has occured'); 
        }
    }; 

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Username</label>
                <input
                id='username'
                type='text'
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                />
            </div>
            <button type='submit'>Add Post</button>
        </form>
    )
}

export default AddPostForm; 