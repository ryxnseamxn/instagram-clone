import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const username = 'derpster'; // Hard-coded username for debugging

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/posts?username=${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data); // Assuming data includes image paths
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
        posts.map((post, index) => (
          <div key={index}>
            <h2>{post.Caption}</h2>
            {post.ImagePath ? ( // Assuming 'ImagePath' contains the path
              <img 
                src={`http://localhost:8000/${post.ImagePath}`} // Adjust the path as necessary
                alt={`Post by ${post.Username}`} 
                style={{ maxWidth: '300px', maxHeight: '300px' }} // Optional: set size limits
              />
            ) : (
              <p>No image available</p>
            )}
            <pre>{JSON.stringify(post)}</pre>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Profile;
