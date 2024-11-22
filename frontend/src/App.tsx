import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SurpriseMe from './pages/SurpriseMe';
import FlavorTrip from './pages/FlavorTrip';
import MealDetails from './pages/MealDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/surprise-me" element={<SurpriseMe />} />
          <Route path="/flavor-trip" element={<FlavorTrip />} />
          <Route path="/meal/:id" element={<MealDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
