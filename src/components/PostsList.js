// src/components/PostsList.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des posts', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Liste des posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
