import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'; 

const Home = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]); // List of meals
  const [selectedMeal, setSelectedMeal] = useState<any>(null); // Selected meal details

  // Fetch meals based on the search query
  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent searching with an empty query
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search?q=${query}`);
      setMeals(response.data);
      setSelectedMeal(null); // Clear previously selected meal
    } catch (error) {
      console.error('Error searching for meals:', error);
    }
  };

  // Detect "Enter" key and trigger search
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
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
    <div className="home-container">
      {!selectedMeal && (
        <>
          <main className="main-content">
            <div className="text-section">
              <h2>Search for delicious recipes, discover cuisines from different countries, or let us surprise you with a random dish!</h2>
              <p>Hungry? Give me an ingredient and I'll cook up a recipe for you!</p>
              <div className="search-section">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown} // Add event listener for Enter key
                  placeholder="Search meals..."
                  className="search-bar"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">
                  Search
                </button>
              </div>
            </div>

            <div className="image-section">
              <img src="/burger.png" alt="Hamburger" />
            </div>
          </main>

          <div className="results">
            {meals.length > 0 && (
              <div className="meals-grid">
                {meals.map((meal: any) => (
                  <div
                    key={meal.idMeal}
                    className="meal-card"
                    onClick={() => fetchMealDetails(meal.idMeal)}
                  >
                    <h3 className="meal-title">{meal.strMeal}</h3>
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="meal-image"
                    />
                  </div>
                ))}
              </div>
            )}
            {meals.length === 0 && query && (
              <p className="text-gray-500">No results found. Try a different search term.</p>
            )}
          </div>
        </>
      )}

      {selectedMeal && (
        <div className="meal-details-container">
          <h2 className="meal-details-title">{selectedMeal.strMeal}</h2>
          <button onClick={() => setSelectedMeal(null)} className="back-button">
            Back to Meals
          </button>
          <div className="meal-details-card">
            <div className="meal-details-top">
              <img
                src={selectedMeal.strMealThumb}
                alt={selectedMeal.strMeal}
                className="meal-details-image"
              />
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

export default Home;
