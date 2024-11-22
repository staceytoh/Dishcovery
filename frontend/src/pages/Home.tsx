import { useState } from 'react';
import axios from 'axios';

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search for delicious recipes, discover cuisines from different countries, or let us surprise you with a random dish</h1>
      <h3>Hungry? Give me an ingredient and I'll cook up a recipe for you!</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search meals..."
        className="border rounded p-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2">Search</button>
      <div className="mt-4">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="border p-2 mb-2">
            <h3>{meal.strMeal}</h3>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-32 h-32" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
