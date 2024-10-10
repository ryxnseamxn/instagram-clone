import React, { useState } from 'react';

const AddPostForm = () => {
    const [username, setUsername] = useState(''); 
    const [caption, setCaption] = useState(''); 
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const formData = new FormData();
        formData.append('username', username);
        formData.append('caption', caption);
        formData.append('image', image);
        try{
            const response = await fetch('http://localhost:8000/addPost', {
                method: 'POST',
                body: formData, // Send formData directly
            });
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
            <div>
                <label htmlFor='caption'>Caption</label>
                <input 
                id='caption'
                type='text'
                value={caption}
                onChange={(e)=>setCaption(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='image'>Image</label>
                <input 
                    id='image'
                    type='file'
                    onChange={handleImageChange}
                    required
                />
            </div>
            <button type='submit'>Add Post</button>
        </form>
    )
}

export default AddPostForm; 