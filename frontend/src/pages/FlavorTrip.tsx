import { useState, useEffect } from 'react';
import axios from 'axios';

const FlavorTrip = () => {
  const [cuisines, setCuisines] = useState([]); // List of cuisines (flags)
  const [selectedArea, setSelectedArea] = useState(null); // Selected area (flag clicked)
  const [meals, setMeals] = useState([]); // Meals from the selected area
  const [selectedMeal, setSelectedMeal] = useState(null); // Selected meal details

  // Fetch cuisines (flags) on component mount
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cuisines`);
        setCuisines(response.data);
      } catch (error) {
        console.error('Error fetching cuisines:', error);
      }
    };

    fetchCuisines();
  }, []);

  // Fetch meals for a selected area
  const fetchMealsByArea = async (area) => {
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
  const fetchMealDetails = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/meal/${id}`);
      setSelectedMeal(response.data);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Flavor Trip</h1>
      <p className="mb-4">Click on a flag to explore recipes from that cuisine!</p>

      {/* Show flags if no area is selected */}
      {!selectedArea && (
        <div className="flex flex-wrap gap-4">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine.strArea}
              onClick={() => fetchMealsByArea(cuisine.strArea)}
              className="flex flex-col items-center"
            >
              <img
                src={`https://flagcdn.com/w320/${cuisine.strArea.toLowerCase().slice(0, 2)}.png`}
                alt={`${cuisine.strArea} flag`}
                className="w-16 h-16 rounded-full"
              />
              <span className="mt-2 text-sm font-semibold">{cuisine.strArea}</span>
            </button>
          ))}
        </div>
      )}

      {/* Show meals if an area is selected and no meal is selected */}
      {selectedArea && !selectedMeal && (
        <div>
          <h2 className="text-xl font-bold mb-4">Meals from {selectedArea}</h2>
          <button
            onClick={() => setSelectedArea(null)}
            className="bg-red-500 text-white px-4 py-2 rounded mb-4"
          >
            Back to Flags
          </button>
          <div className="grid grid-cols-2 gap-4">
            {meals.map((meal) => (
              <div key={meal.idMeal} className="border p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2">{meal.strMeal}</h3>
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-32 object-cover mb-2" />
                <button
                  onClick={() => fetchMealDetails(meal.idMeal)}
                  className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
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
        <div>
          <h2 className="text-xl font-bold mb-4">{selectedMeal.strMeal}</h2>
          <button
            onClick={() => setSelectedMeal(null)}
            className="bg-red-500 text-white px-4 py-2 rounded mb-4"
          >
            Back to Meals
          </button>
          <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} className="w-full h-64 object-cover mb-4" />
          <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc ml-8">
            {Object.keys(selectedMeal)
              .filter((key) => key.startsWith('strIngredient') && selectedMeal[key])
              .map((key) => (
                <li key={key}>
                  {selectedMeal[key]} - {selectedMeal[`strMeasure${key.replace('strIngredient', '')}`] || ''}
                </li>
              ))}
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Instructions:</h3>
          <p>{selectedMeal.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default FlavorTrip;
