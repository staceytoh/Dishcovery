import { useState, useEffect } from 'react';
import axios from 'axios';
import './FlavorTrip.css';

// Map of cuisines to country codes
const areaToCountryCode = {
  American: 'us',
  British: 'gb',
  Canadian: 'ca',
  Chinese: 'cn',
  Croatian: 'hr',
  Dutch: 'nl',
  Egyptian: 'eg',
  French: 'fr',
  Greek: 'gr',
  Indian: 'in',
  Irish: 'ie',
  Italian: 'it',
  Jamaican: 'jm',
  Japanese: 'jp',
  Kenyan: 'ke',
  Malaysian: 'my',
  Mexican: 'mx',
  Moroccan: 'ma',
  Polish: 'pl',
  Portuguese: 'pt',
  Russian: 'ru',
  Spanish: 'es',
  Thai: 'th',
  Tunisian: 'tn',
  Turkish: 'tr',
  Vietnamese: 'vn',
  Ukrainian: 'ua',
  Filipino: 'ph',
};

const FlavorTrip = () => {
  const [cuisines, setCuisines] = useState([]); // List of cuisines (flags)
  const [selectedArea, setSelectedArea] = useState<string | null>(null); // Selected area (flag clicked)
  const [meals, setMeals] = useState([]); // Meals from the selected area
  const [selectedMeal, setSelectedMeal] = useState<any>(null); // Selected meal details

  // Fetch cuisines (flags) on component mount
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cuisines`);
        const filteredCuisines = response.data.filter((cuisine: any) => areaToCountryCode[cuisine.strArea]);
        setCuisines(filteredCuisines);
      } catch (error) {
        console.error('Error fetching cuisines:', error);
      }
    };

    fetchCuisines();
  }, []);

  // Fetch meals for a selected area
  const fetchMealsByArea = async (area: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/meals/${area}`);
      setMeals(response.data);
      setSelectedArea(area);
      setSelectedMeal(null); // Clear previously selected meal
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  // Fetch meal details
  const fetchMealDetails = async (id: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/meal/${id}`);
      setSelectedMeal(response.data);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  return (
    <div className="flavor-trip-container">
      <h1 className="flavor-trip-title">Discover Flavors from Around the World!</h1>
      <p className="flavor-trip-subtitle">Press on a flag to explore delicious recipes from that country!</p>

      {/* Show flags if no area is selected */}
      {!selectedArea && (
        <div className="flags-container">
          {cuisines.map((cuisine: any) => {
            const countryCode = areaToCountryCode[cuisine.strArea];
            return (
              <button
                key={cuisine.strArea}
                onClick={() => fetchMealsByArea(cuisine.strArea)}
                className="flag-button"
              >
                <img
                  src={`https://flagcdn.com/w320/${countryCode}.png`}
                  alt={`${cuisine.strArea} flag`}
                  className="flag-image"
                />
                <span className="flag-label">{cuisine.strArea}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Show meals if an area is selected and no meal is selected */}
      {selectedArea && !selectedMeal && (
        <div className="meals-container">
          <h2 className="selected-area-title">Meals from {selectedArea}</h2>
          <button onClick={() => setSelectedArea(null)} className="back-button">
            Back to Flags
          </button>
          <div className="meals-grid">
            {meals.map((meal: any) => (
              <div key={meal.idMeal} className="meal-card">
                <h3 className="meal-title">{meal.strMeal}</h3>
                <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
                <button
                  onClick={() => fetchMealDetails(meal.idMeal)}
                  className="details-button"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show meal details if a meal is selected */}
      {selectedMeal && (
        <div className="meal-details-container">
          <h2 className="meal-details-title">{selectedMeal.strMeal}</h2>
          <button onClick={() => setSelectedMeal(null)} className="back-button">
            Back to Meals
          </button>
          <div className="meal-details-card">
            <div className="meal-details-top">
              {/* Meal Image */}
              <img
                src={selectedMeal.strMealThumb}
                alt={selectedMeal.strMeal}
                className="meal-details-image"
              />
              {/* Ingredients Section */}
              <div className="ingredients">
                <h4 className="ingredients-title">Ingredients:</h4>
                <ul className="ingredients-list">
                  {Object.keys(selectedMeal)
                    .filter((key) => key.startsWith('strIngredient') && selectedMeal[key])
                    .map((key) => (
                      <li key={key}>
                        {selectedMeal[key]} - {selectedMeal[`strMeasure${key.replace('strIngredient', '')}`] || ''}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            {/* Instructions Section */}
            <div className="instructions">
              <h4 className="instructions-title">Instructions:</h4>
              <p className="instructions-text">{selectedMeal.strInstructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlavorTrip;
