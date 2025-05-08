import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import MatchCard from "./components/MatchCard";

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/suggestions`);
        const data = await res.json();
        setMatches(data.matches);
      } catch (err) {
        console.error("❌ Failed to fetch suggestions", err);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white font-sans p-4">
      <div className="max-w-3xl mx-auto bg-white/10 border border-yellow-500 rounded-xl shadow-2xl p-6 backdrop-blur-md">
        <Header />

        {matches.length > 0 ? (
          matches.map((match, i) => <MatchCard key={i} match={match} />)
        ) : (
          <p className="text-center text-gray-300">Loading match suggestions...</p>
        )}
      </div>
    </div>
  );
}

export default App;