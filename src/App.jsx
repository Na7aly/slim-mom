import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import Dashboard from './components/Dashboard/Dashboard';
import Diary from './components/Diary/Diary';
import Modal from './components/Modal';
import DailyCalorieIntake from './components/DailyCalorieIntake/DailyCalorieIntake';
import products from './data/products.json';
import CalorieCalculator from './components/Calculate/Calculate';
import DailyCaloriesForm from './components/DailyCaloriesForm/DailyCaloriesForm'; // Ensure correct path

function App() {
  const [showModal, setShowModal] = useState(false);
  const [bloodType, setBloodType] = useState(1);

  const handleFormSubmit = (formData) => {
    setBloodType(formData.bloodType); 
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
        <Route path="/slim-mom/" element={<DailyCaloriesForm />} />
          <Route path="/" element={<DailyCaloriesForm />} />
          <Route path="/slim-mom/login" element={<LoginPage />} />
          <Route path="/slim-mom/registration" element={<RegistrationPage />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route 
              path="diary" 
              element={
                <>
                  <Diary onSubmit={handleFormSubmit} />
                  {showModal && (
                    <Modal onClose={handleCloseModal}>
                      <DailyCalorieIntake bloodType={bloodType} products={products} />
                    </Modal>
                  )}
                </>
              } 
            />
            <Route path="calculate" element={<CalorieCalculator />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
