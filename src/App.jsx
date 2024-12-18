import React, { useState } from 'react';
import './App.css'; // TailwindCSS included here
import Cards from './components/Cards'; // Correct import

function App() {
  // State to manage user input for hypercliques
  const [hypercliques, setHypercliques] = useState([]);
  const [currentClique, setCurrentClique] = useState([]);
  const [itemInput, setItemInput] = useState('');
  const [minSupport, setMinSupport] = useState(0.5);
  const [results, setResults] = useState([]); // Add state to store results

  const handleAddItem = () => {
    if (itemInput.trim()) {
      setCurrentClique((prevClique) => [...prevClique, itemInput]);
      setItemInput('');
    }
  };

  const handleCreateClique = () => {
    if (currentClique.length > 0) {
      setHypercliques((prevHypercliques) => [...prevHypercliques, currentClique]);
      setCurrentClique([]);
    }
  };

  const handleRunAnalysis = () => {
    // Step 1: Flatten all the items from all hypercliques
    const allItems = hypercliques.flat();

    // Step 2: Calculate the frequency of each item
    const itemCounts = allItems.reduce((counts, item) => {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {});

    // Step 3: Calculate the support for each item
    const totalItems = allItems.length;
    const itemsWithSupport = Object.entries(itemCounts).map(([item, count]) => {
      const support = count / totalItems;
      return { item, support };
    });

    // Step 4: Filter items that meet the minimum support threshold
    const filteredItems = itemsWithSupport.filter(item => item.support >= minSupport);

    // Step 5: Display the results
    console.log('Filtered Items with Support >= Minimum Support:', filteredItems);
    setResults(filteredItems); // Set the results to state
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Hyperclique Algorithm</h1>

      {/* User Input Section */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2">Enter an Item:</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={itemInput}
            onChange={(e) => setItemInput(e.target.value)}
            placeholder="Enter item"
          />
          <button
            onClick={handleAddItem}
            className="mt-4 w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200">
            Add Item
          </button>
        </div>

        {/* Display current hyperclique */}
        {currentClique.length > 0 && (
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-800">Current Hyperclique:</h4>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {currentClique.map((item, idx) => (
                <div key={idx} className="bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-800">
                  {item}
                </div>
              ))}
            </div>
            <button
              onClick={handleCreateClique}
              className="mt-4 w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition duration-200">
              Create Hyperclique
            </button>
          </div>
        )}

        {/* Add Hypercliques */}
        {hypercliques.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800">Your Hypercliques:</h3>
            <div className="flex overflow-x-auto gap-4 mt-4">
              {/* Horizontal flexbox container for the hypercliques */}
              {hypercliques.map((clique, index) => (
                <div key={index} className="w-64 bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition duration-200">
                  <h4 className="text-center text-lg font-semibold text-gray-800">Hyperclique {index + 1}</h4>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {clique.map((item, idx) => (
                      <div key={idx} className="bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-800">
                        {item}
                      </div>
                    ))}
                  </div>
                  <Cards
                    imageUrl={`https://picsum.photos/200/200?random=${index + 1}`}
                    altText={`Hyperclique ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Support Slider */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200 mt-8">
        <label className="block text-lg font-medium text-gray-800 mb-2">Minimum Support:</label>
        <input
          type="number"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={minSupport}
          step="0.1"
          min="0"
          max="1"
          onChange={(e) => setMinSupport(parseFloat(e.target.value))}
        />
        <button
          onClick={handleRunAnalysis}
          className="mt-6 w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200">
          Run Analysis
        </button>
      </div>

      {/* Results */}
      <div className="mt-8 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800">Filtered Items with Support >= {minSupport}:</h2>
        {results.length > 0 ? (
          <ul className="list-disc list-inside mt-4">
            {results.map((item, idx) => (
              <li key={idx} className="text-gray-700">
                <span className="font-semibold">{item.item}</span> - Support: {item.support.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2">No results to display.</p>
        )}
      </div>
    </div>
  );
}

export default App;
