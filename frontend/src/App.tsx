import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SurpriseMe from './pages/SurpriseMe';
import FlavorTrip from './pages/FlavorTrip';
import Navbar from './components/Navbar'; // Import the Navbar

const App = () => {
  return (
    <Router>
      {/* Navbar outside the Routes */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surprise-me" element={<SurpriseMe />} />
        <Route path="/flavor-trip" element={<FlavorTrip />} />
      </Routes>
    </Router>
  );
};

export default App;
 