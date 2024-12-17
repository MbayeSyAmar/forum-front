import React, { useState, useEffect } from 'react';
import './App.css';
import SidebarNavigation from './components/home_page/SidebarNavigation';
import Header from './components/home_page/Header';
import Editor from './components/home_page/Editor';
import QuestionListItem from './components/home_page/QuestionListItem';
import api from './services/api'; // Assurez-vous que axios est bien configuré

const App = () => {
  const [posts, setPosts] = useState([]); // État pour stocker les posts récupérés depuis l'API

  // Utiliser useEffect pour récupérer les posts à l'initialisation
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts'); 
        setPosts(response.data); // Mettez à jour l'état avec les posts récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des posts:', error);
      }
    };

    fetchPosts(); // Appel de la fonction de récupération des posts
  }, []);

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <SidebarNavigation />
        <div className="main-content">
          <Editor />
          <div className="questions-list">
            {posts.length > 0 ? (
              posts.map((post) => (
                <QuestionListItem key={post._id} post={post} /> // Passez chaque post comme prop
              ))
            ) : (
              <p>Aucun post disponible pour le moment.</p>
            )}
          </div>
        </div>
        <aside className="right-sidebar">
          <div className="sidebar-box">
            <h2>Featured</h2>
            <ul>
              <li>Call for testers for an early access release Stack Overflow extension...</li>
              <li>Similarly to how we initially launched the Beta for Staging</li>
              <li>This is an opportunity to help inform and shape the direction</li>
            </ul>
          </div>
          <div className="sidebar-box">
            <h2>The overflow Blog</h2>
            <ul>
              <li>Call for testers for an early access release of a new eflow extension...</li>
              <li>Similarly to how we initially launched the Beta for Staging</li>
              <li>This is an opportunity to help inform and shape the direction</li>
            </ul>
          </div>
          <div className="sidebar-box">
            <h2>Hot Network Questions</h2>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default App;
