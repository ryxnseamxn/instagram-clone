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
        console.log(posts);
        
        fetchPosts();
    }, []);
    
    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-sm mx-auto px-4 py-8">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-xl font-semibold">Home</h1>
                </div>

                <div className="border-t border-gray-200">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <article key={index} className="border-b border-gray-200 pb-4 mb-4">
                                <div className="py-4">
                                    <Link 
                                        to={`/user/${post.Username}`}
                                        className="font-semibold text-black hover:text-gray-600"
                                    >
                                        {post.Username}
                                    </Link>
                                </div>
                                
                                <div className="relative aspect-square bg-black max-w-xs mx-auto">
                                    <img
                                        src={`http://localhost:8000/${post.Image}`}
                                        alt={`Post by ${post.Username}`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="p-4 max-w-xs mx-auto">
                                    <p>
                                        <Link 
                                            to={`/user/${post.Username}`}
                                            className="font-semibold mr-2 hover:text-gray-600"
                                        >
                                            {post.Username+':'}
                                        </Link>
                                        {post.Caption}
                                    </p>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-64">
                            <p className="text-gray-400">No posts found.</p>
                        </div>
                    )}
                </div>
            </div>
            <Navbar />
        </div>
    );
};

export default Feed;