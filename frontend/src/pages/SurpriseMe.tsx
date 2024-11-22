import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Feeling adventurous?</h1>
      <h1 className="text-2xl font-bold mb-4">Here's a dish to spark your culinary creativity!</h1>
      <h5>Press the button below, and we'll serve you another random recipe to try</h5>
      <button onClick={fetchRandomMeal} className="bg-green-500 text-white p-2">
        Next Recipe, Please!
      </button>
      {meal ? (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-64 h-64 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc ml-8">
            {Object.keys(meal)
              .filter((key) => key.startsWith('strIngredient') && meal[key]) // Filter for non-empty ingredients
              .map((key) => (
                <li key={key}>
                  {meal[key]} - {meal[`strMeasure${key.replace('strIngredient', '')}`] || ''}
                </li>
              ))}
          </ul>
          <h3 className="text-xl font-semibold mt-4 mb-2">Instructions:</h3>
          <p>{meal.strInstructions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SurpriseMe;
