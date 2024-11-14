import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Unfollow from '../button/unfollow';

const User = () => {
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const { username } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/user/${username}`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data.userPosts);
                setFollowers(data.followerCount[0].count);
                setFollowing(data.followingCount[0].count);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    return (
        <div>
            <h1>Followers: {followers}</h1>
            <h1>Following: {following}</h1>
            <h1>{username}'s Posts</h1>
            <Unfollow />
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index}>
                        <h2>{post.Caption}</h2>
                        {post.Image ? (
                            <img
                                src={`http://localhost:8000/${post.Image}`}
                                alt={`Post by ${post.Username}`}
                                style={{ maxWidth: '300px', maxHeight: '300px' }}
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                        <hr />
                    </div>
                ))
            ) : (
                <p>No posts found.</p>
            )}
            <Navbar />
        </div>
    );
};

export default User;
