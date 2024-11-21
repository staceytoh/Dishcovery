const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Root route: Welcomes users to the API
app.get('/', (req, res) => {
  res.send('Welcome to the Dishcovery API!');
});

// Random meal endpoint
app.get('/api/random', async (req, res) => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
    res.json(response.data.meals[0]);
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    res.status(500).json({ error: 'Failed to fetch random recipe' });
  }
});

// Search meals endpoint
app.get('/api/search', async (req, res) => {
  const query = req.query.q; // e.g., ?q=chicken
  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    res.json(response.data.meals || []);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

const PORT = 5001; // Use port 5001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
