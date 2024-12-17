import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import du style de l'éditeur
import api from '../../services/api';
import './Editor.css';

function Editor() {
  const [editorValue, setEditorValue] = useState('');
  const [title, setTitle] = useState('');

  // Fonction de gestion de la modification de l'éditeur
  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  // Fonction pour gérer l'envoi du post
  const handleSubmit = async () => {
    if (!title.trim() || !editorValue.trim()) {
      alert("Veuillez entrer un titre et un contenu.");
      return;
    }

    try {
      await api.post('/posts', {
        title,
        content: editorValue,
      });
      alert("Post envoyé avec succès !");
      setTitle('');
      setEditorValue('');
    } catch (error) {
      console.error("Erreur lors de l'envoi du post :", error);
    }
  };

  return (
    <div className="editor-container">
      <h2 className="editor-header">Créer un nouveau post</h2>
      
      {/* Champ pour le titre du post */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entrez le titre de votre post ici..."
        className="title-input"
      />

      {/* Éditeur pour le contenu du post */}
      <div className="editor-frame">
        <ReactQuill
          value={editorValue}
          onChange={handleEditorChange}
          placeholder="Tapez votre message ici..."
          theme="snow"
        />
      </div>

      <button onClick={handleSubmit} className="submit-button">Envoyer</button>
    </div>
  );
}

export default Editor;
