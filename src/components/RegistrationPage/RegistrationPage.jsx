import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css';
import Header from '../Header/Header';

function RegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = { name, email, password };
    console.log('Submitting registration data:', userData);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        navigate('/login'); // Redirect to login on success
      } else {
        const errorMessage = await response.text();
        console.error('Registration failed:', errorMessage);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <main className={styles.container}>
     <Header />
      <h2 className={styles.heading}>REGISTER</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.buttoncontainer}  >
        <button type="submit" className={styles.button}>Register</button>
        <button type="button" className={styles.button} onClick={() => navigate('/login')}>Login</button>
        </div>
      </form>
    </main>
  );
}

export default RegistrationPage;
