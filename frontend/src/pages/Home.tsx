const Home = () => {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Dishcovery</h1>
        <p className="text-lg mb-4">Search for your favorite recipes!</p>
        <input
          type="text"
          placeholder="Search meals..."
          className="border rounded p-2"
        />
        <button className="bg-blue-500 text-white p-2 ml-2">Search</button>
      </div>
    );
  };
  
  export default Home;
  