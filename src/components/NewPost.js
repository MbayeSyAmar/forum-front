// src/components/NewPost.js
import React, { useState } from 'react';
import api from '../services/api';

function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/posts', { title, content });
      alert('Post créé avec succès!');
    } catch (error) {
      console.error('Erreur lors de la création du post', error);
      alert('Erreur lors de la création du post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nouveau Post</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Contenu"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Créer le post</button>
    </form>
  );
}

export default NewPost;
