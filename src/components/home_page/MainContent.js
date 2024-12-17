import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import des styles de React Quill
import api from '../../services/api';
import QuestionListItem from './QuestionListItem';
import './MainContent.css';

function MainContent() {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Fonction pour récupérer tous les posts
  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des posts :", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fonction pour créer un nouveau post
  const handlePostSubmit = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const response = await api.post('/posts', {
        title: newTitle,
        content: newContent,
      });
      setPosts([response.data, ...posts]); // Ajoute le nouveau post en haut de la liste
      setNewTitle('');
      setNewContent('');
    } catch (error) {
      console.error("Erreur lors de la création du post :", error);
    }
  };

  return (
    <div className="main-content">
      <div className="question-form">
        <label>Titre de la question</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Titre du post"
        />

        <label>Contenu de la question</label>
        <ReactQuill
          value={newContent}
          onChange={setNewContent}
          placeholder="Décrivez votre problème ici..."
          theme="snow"
        />
        
        <button onClick={handlePostSubmit} className="submit-button">Envoyer</button>
      </div>

      <div className="questions-list">
        {posts.map((post) => (
          <QuestionListItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default MainContent;
