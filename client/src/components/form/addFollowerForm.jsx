import React, { useState } from 'react';

const AddFollowerForm = () => {
    const [follower, setFollower] = useState(''); 
    const [following, setFollowing] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try{
            const response = await fetch('http://localhost:8000/addFollower', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    follower,
                    following
                }),
            })
            if (response.ok) {
                const data = await response.json();
                alert('follower added successfully!');
              } else {
                alert('Error adding follower.');
              }
        }catch(err){
            console.error('Error adding follower', err);
            alert('An error has occured'); 
        }
    }; 

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='follower'>Follower</label>
                <input
                id='follower'
                type='text'
                value={follower}
                onChange={(e)=>setFollower(e.target.value)}
                required
                />
            </div>
            <div>
                <label htmlFor='following'>Following</label>
                <input 
                id='Following'
                type='text'
                value={following}
                onChange={(e)=>setFollowing(e.target.value)}
                />
            </div>
            <button type='submit'>Add Follower</button>
        </form>
    )
}

export default AddFollowerForm; 