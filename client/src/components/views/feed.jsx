import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { Link } from "react-router-dom";

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
                        <h2>
                            <Link to={`/user/${post.Username}`}>
                                {post.Username}
                            </Link>
                        </h2>
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
            <Navbar />
        </div>
    )
}

export default Feed;
