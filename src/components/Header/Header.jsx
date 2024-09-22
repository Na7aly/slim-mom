import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importă Link
import styles from './Header.module.css';
import logoImage from '../../img/logo (1).png';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      fetch('/api/user', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch(() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData(null);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={handleLogoClick}>
        <img src={logoImage} alt="Logo" />
      </div>
      {isLoggedIn ? (
        <div className={styles.userInfo}>
          <p>Hello, {userData?.username}!</p>
          <button className={styles.btn} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <nav className={styles.navigation}>
          <Link to="/login">LOG IN</Link> {}
          <Link to="/registration">REGISTRATION</Link> {}
        </nav>
      )}
    </header>
  );
}

export default Header;
