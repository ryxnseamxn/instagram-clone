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
        console.log(data); 
        setPosts(data); // Assuming data includes image paths
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [username]);

  return (
    <div>
      <h1>{username}'s Posts</h1>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index}>
            <h2>{post.Caption}</h2>
            {post.Image ? ( 
              <img 
                src={`http://localhost:8000/${post.Image}`}
                alt={`Post by ${post.Username}`} 
                style={{maxWidth: '300px', maxHeight: '300px'}}
              />
            ) : (
              <p>No image available</p>
            )}
            <hr/>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Profile;
