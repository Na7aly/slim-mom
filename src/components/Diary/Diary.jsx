import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaPlus, FaTimes } from 'react-icons/fa';
import productData from '../../data/products.json'; // Importing the JSON file
import styles from './Diary.module.css'; // Importing your CSS

const Diary = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [dailyProducts, setDailyProducts] = useState({});
  const [productName, setProductName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [grams, setGrams] = useState('');

  // Retrieve the data from localStorage on component mount
  useEffect(() => {
    const storedProducts = localStorage.getItem('dailyProducts');
    if (storedProducts) {
      setDailyProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Save the data to localStorage every time dailyProducts changes
  useEffect(() => {
    localStorage.setItem('dailyProducts', JSON.stringify(dailyProducts));
  }, [dailyProducts]);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // Formats date as 'YYYY-MM-DD'
  };

  // Get products for the current date
  const products = dailyProducts[formatDate(startDate)] || [];

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
    if (event.target.value.trim() !== '') {
      const results = productData.filter((product) =>
        product.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSearchResults([]);
    setProductName(product.title);
    setGrams('');
  };

  const handleAddProduct = () => {
    if (selectedProduct && grams) {
      const gramsValue = parseInt(grams, 10);
      const newProduct = {
        name: selectedProduct.title,
        grams: gramsValue,
        caloriesPer100g: selectedProduct.calories,
        calories: Math.round((gramsValue * selectedProduct.calories) / 100),
      };
      const updatedProducts = [...products, newProduct];

      setDailyProducts((prevDailyProducts) => ({
        ...prevDailyProducts,
        [formatDate(startDate)]: updatedProducts,
      }));

      setProductName('');
      setGrams('');
      setSelectedProduct(null);
    }
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];

    if (field === 'grams') {
      const grams = parseInt(value, 10);
      updatedProducts[index].grams = grams;
      updatedProducts[index].calories = Math.round(
        (grams * updatedProducts[index].caloriesPer100g) / 100
      );
    }

    setDailyProducts((prevDailyProducts) => ({
      ...prevDailyProducts,
      [formatDate(startDate)]: updatedProducts,
    }));
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setDailyProducts((prevDailyProducts) => ({
      ...prevDailyProducts,
      [formatDate(startDate)]: updatedProducts,
    }));
  };

  const calculateTotalCalories = () => {
    return products.reduce((total, product) => total + product.calories, 0);
  };

  const calculateDailyRate = () => {
    return 2800; // Example daily rate
  };

  const calculatePercentOfNormal = () => {
    return (calculateTotalCalories() / calculateDailyRate()) * 100;
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setShowCalendar(false);
  };

  // Filter the products to find foods not recommended for the selected blood type
  const foodsNotRecommended = productData.filter((product) =>
    product.groupBloodNotAllowed && product.groupBloodNotAllowed[0] // Assuming blood type index 0 for demonstration
  );

  return (
    <div className={styles.app}>
      <div className={styles['left-side']}>
        <h2>
          {startDate.toLocaleDateString()}
          <FaCalendarAlt
            onClick={toggleCalendar}
            style={{ marginLeft: '10px', cursor: 'pointer' }}
          />
        </h2>
        {showCalendar && (
          <DatePicker selected={startDate} onChange={handleDateChange} inline />
        )}
        <div className={styles.infoContainer}>
          <input
            className={styles.info}
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={handleProductNameChange}
          />
        </div>

        <ul>
          {searchResults.map((product) => (
            <li key={product._id} onClick={() => handleSelectProduct(product)}>
              {product.title} - {product.calories} kcal
            </li>
          ))}
        </ul>

        {selectedProduct && (
          <div>
            <input
              type="number"
              placeholder="Enter grams"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
            />
            <button onClick={handleAddProduct} disabled={!grams}>
              <FaPlus /> Add Product
            </button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Grams</th>
              <th>Calories</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>
                  <input
                    type="number"
                    value={product.grams}
                    onChange={(event) =>
                      handleProductChange(index, 'grams', event.target.value)
                    }
                  />
                </td>
                <td>{product.calories} kcal</td>
                <td>
                  <FaTimes
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveProduct(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles['right-side']}>
        <h2>Summary for {startDate.toLocaleDateString()}</h2>
        <div className={styles['summary-item']}>
          <span>Left</span>
          <span>{calculateDailyRate() - calculateTotalCalories()} kcal</span>
        </div>
        <div className={styles['summary-item']}>
          <span>Consumed</span>
          <span>{calculateTotalCalories()} kcal</span>
        </div>
        <div className={styles['summary-item']}>
          <span>Daily rate</span>
          <span>{calculateDailyRate()} kcal</span>
        </div>
        <div className={styles['summary-item']}>
          <span>% of normal</span>
          <span>{calculatePercentOfNormal().toFixed(0)}%</span>
        </div>
        <h3>Food not recommended</h3>
        <ul>
          {foodsNotRecommended.map((food) => (
            <li key={food._id}>{food.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Diary;
