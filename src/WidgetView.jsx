// WidgetView.jsx
import React, { useEffect, useState } from 'react';
import MatchCard from './components/MatchCard';

export default function WidgetView() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE + '/api/suggestions')
      .then((res) => res.json())
      .then((data) => setMatches(data.matches || []))
      .catch((err) => console.error('Failed to fetch suggestions:', err));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-2">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}