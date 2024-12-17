// src/components/Register.js
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
// Icons
// import userIcon from "../../img/user.svg";
import emailIcon from "../../img/email.svg";
import passwordIcon from "../../img/password.svg";
// Styles
import styles from "./register.module.css";
import "react-toastify/dist/ReactToastify.css";
// Toast
import { ToastContainer } from "react-toastify";
import { notify } from "./toast";
// Router
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validateForm({ email, password }));
  }, [email, password, touched]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      try {
        await api.post('/users/register', { email, password });
        notify("Inscription réussie!", "success");
      } catch (error) {
        console.error('Erreur lors de l\'inscription', error);
        notify("Erreur lors de l'inscription", "error");
      }
    } else {
      notify("Veuillez vérifier les champs", "error");
      setTouched({ email: true, password: true });
    }
  };

  const handleFocus = (field) => setTouched({ ...touched, [field]: true });

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        
        <div>
          <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : undefined}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus("email")}
              autoComplete="off"
            />
            <img src={emailIcon} alt="Email Icon" />
          </div>
          {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div>
          <div className={errors.password && touched.password ? styles.unCompleted : !errors.password && touched.password ? styles.completed : undefined}>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus("password")}
              autoComplete="off"
            />
            <img src={passwordIcon} alt="Password Icon" />
          </div>
          {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        <button type="submit">S'inscrire</button>
        <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
          Vous avez déjà un compte? <Link to="/login">Connectez-vous</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;

// Helper function to validate the form
function validateForm({ email, password }) {
  const errors = {};
  if (!email) errors.email = "L'email est requis";
  if (!password) errors.password = "Le mot de passe est requis";
  return errors;
}
