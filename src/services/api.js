// src/services/api.js

import axios from 'axios';

// Configurer l'URL de base de l'API (assurez-vous que le port soit correct)
const api = axios.create({
  baseURL: 'http://localhost:3000', // Change cette URL si le backend est sur un autre port
});

// Ajouter un token d'authentification (si nécessaire)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
