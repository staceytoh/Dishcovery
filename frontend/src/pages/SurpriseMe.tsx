import { useState, useEffect } from 'react';
import axios from 'axios';
import './SurpriseMe.css';

const SurpriseMe = () => {
  const [meal, setMeal] = useState(null);

  // Function to fetch a random meal
  const fetchRandomMeal = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/random`);
      setMeal(response.data);
    } catch (error) {
      console.error('Error fetching random meal:', error);
    }
  };

  // Fetch a random meal when the component mounts
  useEffect(() => {
    fetchRandomMeal();
  }, []);

  return (
    <div className="surprise-me-container">
      {/* Title Section */}
      <h1 className="surprise-me-title">Feeling adventurous?</h1>
      <h2 className="surprise-me-subtitle">Here's a dish to spark your culinary creativity!</h2>

      {/* Meal Card */}
      {meal && (
        <div className="meal-card">
          {/* Top Section: Image and Ingredients */}
          <div className="meal-top">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="ingredients">
              <h4>Ingredients:</h4>
              <ul className="ingredients-list">
                {Object.keys(meal)
                  .filter((key) => key.startsWith('strIngredient') && meal[key])
                  .map((key) => (
                    <li key={key}>
                      {meal[key]} - {meal[`strMeasure${key.replace('strIngredient', '')}`] || ''}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="instructions">
            <h4>Instructions:</h4>
            <p>{meal.strInstructions}</p>
          </div>
        </div>
      )}

      {/* Button Section */}
      <p className="surprise-me-description">
        Press the button below, and we'll serve you another random recipe to try
      </p>
      <button onClick={fetchRandomMeal} className="surprise-me-button">
        Next Recipe, Please!
      </button>
    </div>
  );
};

export default SurpriseMe;
