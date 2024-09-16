import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import DailyCalorieIntake from '../DailyCalorieIntake/DailyCalorieIntake';
import styles from './Calculate.module.css';
import productData from '../../data/products.json'; 
const Summary = ({ totalCalories, dailyRate, notRecommendedFoods }) => {
  const leftCalories = dailyRate - totalCalories;
  const percentOfNormal = (totalCalories / dailyRate) * 100;

  return (
    <div className={styles.summaryContainer}>
      <h2>Summary</h2>
      <div className={styles.summaryItem}>
        <span>Left</span>
        <span>{leftCalories === 0 ? '000' : leftCalories} kcal</span>
      </div>
      <div className={styles.summaryItem}>
        <span>Consumed</span>
        <span>{totalCalories === 0 ? '000' : totalCalories} kcal</span>
      </div>
      <div className={styles.summaryItem}>
        <span>Daily rate</span>
        <span>{dailyRate === 0 ? '000' : dailyRate} kcal</span>
      </div>
      <div className={styles.summaryItem}>
        <span>% of normal</span>
        <span>{totalCalories === 0 ? '000' : percentOfNormal.toFixed(0)}%</span>
      </div>
      <h3>Food not recommended</h3>
      <ul>
        {notRecommendedFoods.length > 0 ? (
          notRecommendedFoods.map((food, index) => <li key={index}>{food}</li>)
        ) : (
          <li>Your diet will be displayed here</li>
        )}
      </ul>
    </div>
  );
};

function Calculate() {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [bloodType, setBloodType] = useState(1);
  const [currentWeight, setCurrentWeight] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalCalories = 0; 
  const dailyRate = 0; 
  const [notRecommendedFoods, setNotRecommendedFoods] = useState([]); 

  useEffect(() => {
    
    const filteredFoods = productData
      .filter(product => product.groupBloodNotAllowed[bloodType] === true)
      .map(product => product.title);

    setNotRecommendedFoods(filteredFoods);
  }, [bloodType]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsModalOpen(true); 
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.title}>
          <h1>Calculate Your Daily Calorie <br /> Intake Right Now</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSection}>
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label>Height (cm)*</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Age (years)*</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Current Weight (kg)*</label>
                <input
                  type="number"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label>Desired Weight (kg)*</label>
                <input
                  type="number"
                  value={desiredWeight}
                  onChange={(e) => setDesiredWeight(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Blood Type*</label>
                <div className={styles.bloodTypeContainer}>
                  {[1, 2, 3, 4].map((type) => (
                    <label key={type} data-number={type}>
                      <input
                        type="radio"
                        value={type}
                        checked={bloodType === type}
                        onChange={() => setBloodType(type)}
                      />{' '}
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.btn}>
              Start Losing Weight
            </button>
          </div>
        </form>
        
        
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <DailyCalorieIntake
              height={height}
              age={age}
              desiredWeight={desiredWeight}
              currentWeight={currentWeight}
              bloodType={bloodType}
              currentPage="calculate" 
            />
          </Modal>
        )}
      </div>
      
      <div className={styles.summarySection}>
        <Summary
          totalCalories={totalCalories}
          dailyRate={dailyRate}
          notRecommendedFoods={notRecommendedFoods}
        />
      </div>
    </div>
  );
}

export default Calculate;
