import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Diary from '../Diary/Diary';
import Calculate from '../Calculate/Calculate';
import logoImage from '../../img/logo (1).png';
import Summary from '../Summary/Summary'; 
import styles from './Dashboard.module.css'; 

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [totalCalories, setTotalCalories] = useState(0);
  const [dailyRate, setDailyRate] = useState(2800); 
  const [notRecommendedFoods, setNotRecommendedFoods] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString()); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/user', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            setUserName(data.name);
           
            const responseData = await fetch(`http://localhost:5000/api/daily-summary?date=${currentDate}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (responseData.ok) {
              const summaryData = await responseData.json();
              setTotalCalories(summaryData.totalCalories);
              setNotRecommendedFoods(summaryData.notRecommendedFoods);
            } else {
              console.error('Failed to fetch daily summary');
            }
          } else {
            console.error('Failed to fetch user data');
            navigate('/login');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate, currentDate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.dashboard}>
      
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logoImage} alt="Logo" className={styles.logoImage} />
        </div>

        <nav className={styles.nav}>
          <Link to="diary" className={styles.navItem}>Diary</Link>
          <Link to="calculate" className={styles.navItem}>Calculate</Link>
        </nav>

        <div className={styles.userSection}>
          <span className={styles.userName}>Welcome, {userName}!</span>
          <span onClick={handleLogout} className={styles.logoutText}>Exit</span>
        </div>
      </header>

    
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<Calculate />} /> 
          <Route path="diary" element={<Diary />} />
          <Route path="calculate" element={<Calculate />} />
        </Routes>

        {/* Render the Summary component with current date */}
        {/* <Summary
          totalCalories={totalCalories}
          dailyRate={dailyRate}
          notRecommendedFoods={notRecommendedFoods}
        /> */}
      </main>
    </div>
  );
};

export default Dashboard;
