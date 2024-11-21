import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/surprise-me" className="hover:underline">Surprise Me!</Link>
        </li>
        <li>
          <Link to="/flavor-trip" className="hover:underline">Flavor Trip</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
