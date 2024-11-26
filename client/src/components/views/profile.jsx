import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:8000/posts`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsername(data.username);
                setPosts(data.userPosts);
                setFollowers(data.followerCount[0].count);
                setFollowing(data.followingCount[0].count);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-sm mx-auto px-4 py-8">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-xl font-semibold mb-4">{username}</h1>
                    

                    <div className="flex gap-8">
                        <div className="text-center">
                            <span className="font-semibold">{posts.length}</span>
                            <p className="text-sm">posts</p>
                        </div>
                        <div className="text-center">
                            <span className="font-semibold">{followers}</span>
                            <p className="text-sm">followers</p>
                        </div>
                        <div className="text-center">
                            <span className="font-semibold">{following}</span>
                            <p className="text-sm">following</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <article key={index} className="border-b border-gray-200 pb-4 mb-4">
                                <div className="relative aspect-square bg-black max-w-xs mx-auto">
                                    <img
                                        src={`http://localhost:8000/${post.Image}`}
                                        alt={`Post by ${username}`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="p-4 max-w-xs mx-auto">
                                    <p>
                                        <span className="font-semibold mr-2">
                                            {username}
                                        </span>
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

export default Profile;