import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MealDetails = () => {
  const { id } = useParams(); // Get the meal ID from the URL
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/meal/${id}`);
        setMeal(response.data);
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (!meal) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-64 h-64 mb-4" />
      <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
      <ul className="list-disc ml-8">
        {Object.keys(meal)
          .filter((key) => key.startsWith('strIngredient') && meal[key])
          .map((key, index) => (
            <li key={index}>
              {meal[key]} - {meal[`strMeasure${key.replace('strIngredient', '')}`]}
            </li>
          ))}
      </ul>
      <h2 className="text-xl font-semibold mt-4 mb-2">Instructions:</h2>
      <p>{meal.strInstructions}</p>
    </div>
  );
};

export default MealDetails;
