import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DailyCalorieIntake.module.css';

function DailyCalorieIntake({ bloodType, products = [], onClose, currentPage, isAuthenticated }) {
  const calorieIntake = 2800;
  const navigate = useNavigate();

  const foodsToAvoid = products
    .filter((product) => product.groupBloodNotAllowed && product.groupBloodNotAllowed[bloodType])
    .slice(0, 5);

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      navigate('/login'); 
    } else {
      if (currentPage === 'calculate') {
        navigate('/dashboard/diary'); 
      } else if (currentPage === 'dailyCaloriesForm') {
        navigate('/dashboard/calculate'); 
      }
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      
      <h2>Your recommended daily calorie intake is</h2>
      <h1>{calorieIntake} ккал</h1>
      <h3>Foods you should not eat</h3>
      <ul className={styles.foodList}>
        {foodsToAvoid.length > 0 ? (
          foodsToAvoid.map((food) => (
            <li key={food._id}>{food.title}</li>
          ))
        ) : (
          <li>No foods to avoid for this blood type</li>
        )}
      </ul>
      <button onClick={handleButtonClick} className={styles.btn}>
        Start losing weight
      </button>
    </div>
  );
}

export default DailyCalorieIntake;
