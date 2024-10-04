import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const username = 'derpster'; // Hard-coded user ID for debugging

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/posts?username=${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [username]);

  return (
    <div>
      <h1>Your Posts</h1>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id}>{post.content}</div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Profile;
