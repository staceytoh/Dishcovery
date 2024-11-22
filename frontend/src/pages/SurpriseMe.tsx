import { useState } from 'react';
import axios from 'axios';

const SurpriseMe = () => {
  const [meal, setMeal] = useState(null);

  const fetchRandomMeal = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/random`);
      setMeal(response.data);
    } catch (error) {
      console.error('Error fetching random meal:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Feeling adventerous?</h1>
      <h1 className="text-2xl font-bold mb-4">Here's a dish to spark your culinary creativity!</h1>
      <h4>Press the button below, and we'll serve you another random recipe to try.</h4>
      <button onClick={fetchRandomMeal} className="bg-green-500 text-white p-2">Next Recipe, Please!</button>
      {meal && (
        <div className="mt-4">
          <h3>{meal.strMeal}</h3>
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-32 h-32" />
          <p>{meal.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default SurpriseMe;
