import React, { useEffect, useState } from "react";

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/feed`, {
                    credentials: 'include'
                })
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                const data = await response.json();
                console.log(data.posts); 
                setPosts(data.posts);
            } catch (err) {
                console.log('Error fetching feed', err);
            }
        };

        fetchPosts();
    }, []);
    return (
        <div>
            <h1>Home</h1>
            {posts.length > 0 ?
                posts.map((post, index) => (
                    <div key={index}>
                        <h2>{post.Username}</h2>
                        <h2>{post.Caption}</h2>
                        <img
                            src={`http://localhost:8000/${post.Image}`}
                            alt={`Post by ${post.Username}`}
                            style={{ maxWidth: '300px', maxHeight: '300px' }}
                        />
                    </div>
                )) : (
                    <p>No posts found.</p>
                )
            }
        </div>
    )
}

export default Feed; 