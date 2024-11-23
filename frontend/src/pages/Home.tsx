import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Ensure the CSS file is linked correctly

const Home = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search?q=${query}`);
      setMeals(response.data);
    } catch (error) {
      console.error('Error searching for meals:', error);
    }
  };

  return (
    <div className="container">
      {/* Main Content */}
      <main className="main-content">
        <div className="text-section">
          <h2>Search for delicious recipes, discover cuisines from different countries, or let us surprise you with a random dish!</h2>
          <p>Hungry? Give me an ingredient and I'll cook up a recipe for you!</p>
          <div className="search-section">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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

      {/* Search Results */}
      <div className="results mt-4">
        {meals.length > 0 && (
          <div className="meal-grid">
            {meals.map((meal) => (
              <div key={meal.idMeal} className="meal-card">
                <h3 className="font-bold">{meal.strMeal}</h3>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="meal-image w-32 h-32 mb-2"
                />
                <Link to={`/meal/${meal.idMeal}`} className="text-blue-500 underline">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
        {meals.length === 0 && query && (
          <p className="text-gray-500">No results found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
