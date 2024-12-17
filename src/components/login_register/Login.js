// src/components/Login.js
import React, { useState } from 'react';
import emailIcon from '../../img/email.svg';
import passwordIcon from '../../img/password.svg';
import styles from './register.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      toast.success('Connexion réussie!');
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      toast.error('Erreur lors de la connexion');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={handleSubmit} autoComplete="off">
        <h2>Connexion</h2>
        
        <div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <img src={emailIcon} alt="Email Icon" />
          </div>
        </div>

        <div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img src={passwordIcon} alt="Password Icon" />
          </div>
        </div>

        <div>
          <button type="submit" className={styles.button}>Se connecter</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Pas encore de compte? <Link to="/signup">Créer un compte</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
