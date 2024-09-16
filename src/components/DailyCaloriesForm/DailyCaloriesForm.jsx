import React, { useState } from 'react';
import Modal from '../Modal';
import DailyCalorieIntake from '../DailyCalorieIntake/DailyCalorieIntake';
import styles from './DailyCaloriesForm.module.css';
import Header from '../Header/Header';

// Import the images
import bananaImg from '../../img/Layer-9.png';  // Adjust the path as necessary
import strawberryImg from '../../img/Strawberry-Big-PNG.png';  // Adjust the path as necessary
import paletteImg from '../../img/Vector 3.png';  // Adjust the path as necessary

function DailyCaloriesForm({ products }) {
  const [height, setHeight] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [age, setAge] = useState('');
  const [bloodType, setBloodType] = useState(1);
  const [currentWeight, setCurrentWeight] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
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
          <button type="submit" className={styles.btn}>
            Start Losing Weight
          </button>
        </form>
        {showModal && (
          <Modal onClose={handleCloseModal}>
            <DailyCalorieIntake bloodType={bloodType} products={products} />
          </Modal>
        )}
      </div>
      {/* <div className={styles.imagesContainer}>
        <img src={bananaImg} alt="Banana" className={styles.bananaImage} />
        <img src={strawberryImg} alt="Strawberry" className={styles.strawberryImage} />
        <img src={paletteImg} alt="Palette" className={styles.paletteImage} />
      </div> */}
    </div>
  );
}

export default DailyCaloriesForm;
