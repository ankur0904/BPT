import React, { useState } from "react";
import "./App.css"; // TailwindCSS included here
import Cards from "./components/Cards";
import ThreeBackground from "./components/ThreeBackground";

function App() {
  const [hypercliques, setHypercliques] = useState([]);
  const [currentClique, setCurrentClique] = useState([]);
  const [itemInput, setItemInput] = useState("");
  const [minSupport, setMinSupport] = useState(0.5);
  const [results, setResults] = useState([]);

  const handleAddItem = () => {
    if (itemInput.trim()) {
      setCurrentClique((prevClique) => [...prevClique, itemInput]);
      setItemInput("");
    }
  };

  const handleCreateClique = () => {
    if (currentClique.length > 0) {
      setHypercliques((prevHypercliques) => [...prevHypercliques, currentClique]);
      setCurrentClique([]);
    }
  };

  const handleRunAnalysis = () => {
    const allItems = hypercliques.flat();
    const itemCounts = allItems.reduce((counts, item) => {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {});

    const totalItems = allItems.length;
    const itemsWithSupport = Object.entries(itemCounts).map(([item, count]) => {
      const support = count / totalItems;
      return { item, support };
    });

    const filteredItems = itemsWithSupport.filter((item) => item.support >= minSupport);

    setResults(filteredItems);
  };

  return (
    <div className="relative min-h-screen">
      {/* Fullscreen 3D Background */}
      <div className="fixed inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Content Area */}
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="bg-blue-700 text-white py-12 text-center rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold mb-4">Hyperclique Algorithm</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Analyze and filter hypercliques using the power of frequency analysis and support thresholds.
          </p>
        </header>

        {/* Main Content */}
        <main className="mt-12 flex flex-col items-center">
          {/* User Input Section */}
          <section className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <label className="block text-lg font-medium text-gray-800 mb-2">Enter an Item:</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
                placeholder="Enter item"
              />
              <button
                onClick={handleAddItem}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Add Item
              </button>
            </div>

            {/* Display current hyperclique */}
            {currentClique.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-800">Current Hyperclique:</h4>
                <div className="flex flex-wrap gap-2 mt-3">
                  {currentClique.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-800"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleCreateClique}
                  className="mt-4 w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Create Hyperclique
                </button>
              </div>
            )}

            {/* Display hypercliques */}
            {hypercliques.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-gray-800">Your Hypercliques:</h3>
                <div className="flex flex-wrap gap-6 mt-6">
                  {hypercliques.map((clique, index) => (
                    <div
                      key={index}
                      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition duration-200"
                    >
                      <h4 className="text-center text-lg font-semibold text-gray-800">
                        Hyperclique {index + 1}
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2 mt-3">
                        {clique.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-800"
                          >
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
          </section>

          {/* Support Slider */}
          <section className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200 mt-8">
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
              className="mt-6 w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Run Analysis
            </button>
          </section>

          {/* Results */}
          <section className="mt-8 max-w-3xl w-full">
            <h2 className="text-2xl font-semibold text-gray-800">
              Filtered Items with Support >= {minSupport}:
            </h2>
            {results.length > 0 ? (
              <ul className="list-disc list-inside mt-4">
                {results.map((item, idx) => (
                  <li key={idx} className="text-gray-700">
                    <span className="font-semibold">{item.item}</span> - Support:{" "}
                    {item.support.toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mt-2">No results to display.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
