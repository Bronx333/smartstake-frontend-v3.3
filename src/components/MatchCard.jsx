// src/components/MatchCard.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import {
  ClockIcon,
  TrophyIcon,
  NewspaperIcon,
  BoltIcon,
  FireIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

function MatchCard({ match }) {
  const {
    match: matchTitle,
    kickoff,
    suggestion,
    odds,
    trend,
    trendRatio,
    priceChange,
    newsInsight,
    newsUrl,
    league = "Premier League",
  } = match;

  const kickoffTime = new Date(kickoff);
  const formattedTime = kickoffTime.toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const isPriceArray = Array.isArray(priceChange) && priceChange.length >= 2;
  const priceStart = isPriceArray ? priceChange[0] : 0;
  const priceEnd = isPriceArray ? priceChange[priceChange.length - 1] : 0;
  const priceChangePercent = priceStart
    ? (((priceStart - priceEnd) / priceStart) * 100).toFixed(2)
    : 0;
  const priceWentDown = priceStart > priceEnd;
  const priceDirection = priceWentDown ? "🔻" : priceStart < priceEnd ? "🔼" : "⏸️";
  const priceColor = priceWentDown
    ? "text-red-400"
    : priceStart < priceEnd
    ? "text-green-400"
    : "text-gray-400";

  const chartData = {
    labels: isPriceArray ? priceChange.map((_, i) => `${priceChange.length - 1 - i}h`) : [],
    datasets: [
      {
        data: isPriceArray ? priceChange : [],
        borderColor: "#facc15",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    scales: { x: { display: false }, y: { display: false } },
    plugins: { legend: { display: false } },
    responsive: false,
    maintainAspectRatio: false,
  };

  const trendIcons = {
    Hot: <FireIcon className="w-4 h-4 mr-1 text-orange-400" />,
    Rising: <ArrowTrendingUpIcon className="w-4 h-4 mr-1 text-green-400" />,
    Stable: <ArrowPathIcon className="w-4 h-4 mr-1 text-gray-400" />,
    "High Volume": <BoltIcon className="w-4 h-4 mr-1 text-blue-400" />,
  };

  const handleBetClick = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5051";
      console.log("📡 API BASE:", apiBase);
      console.log("Logging bet to:", `${apiBase}/api/log`);
      const res = await fetch(`${apiBase}/api/log`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "bet_click",
          payload: {
            match: matchTitle,
            suggestion,
            odds,
            kickoff,
          },
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        console.error("❌ Server error logging bet:", res.statusText, result);
      }
    } catch (err) {
      console.error("❌ Failed to log bet click", err);
    }
  };

  return (
    <div className="bg-[#0D1B2A] text-white p-4 rounded-xl mb-4 shadow-lg border border-yellow-500">
      {/* League */}
      <div className="text-sm text-gray-400 font-medium mb-1">{league}</div>

      {/* Match + Time */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold text-white flex items-center">
          <TrophyIcon className="w-5 h-5 mr-2 text-yellow-400" />
          {matchTitle}
        </div>
        <div className="flex items-center text-sm text-gray-300">
          <ClockIcon className="w-4 h-4 mr-1" />
          {formattedTime}
        </div>
      </div>

      {/* Suggestion + Odds + BET */}
      <div className="flex justify-between items-center mt-2">
        <div className="text-yellow-300 text-md font-semibold flex items-center">
          <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
          {suggestion?.replace("Stake on ", "") || "No suggestion"}
        </div>
        <button
          onClick={handleBetClick}
          className="px-3 py-1 bg-yellow-400 text-black rounded font-bold text-sm hover:bg-yellow-300 transition-all"
        >
          {odds?.toFixed(2) || "--"} BET
        </button>
      </div>

      {/* Trend + Chart + % */}
      <div className="flex justify-between items-end mt-2">
        <div className="w-1/2 text-sm text-gray-300 flex items-center">
          {trendIcons[trend] || <BoltIcon className="w-4 h-4 mr-1" />}
          {trend} ({trendRatio})
        </div>

        {isPriceArray && (
          <div className="flex items-end gap-2">
            <div className="w-[80px] h-[40px]">
              <Line data={chartData} options={chartOptions} width={80} height={40} />
            </div>
            <div className={`text-sm font-semibold ${priceColor}`}>
              {priceDirection} {Math.abs(priceChangePercent)}%
            </div>
          </div>
        )}
      </div>

      {/* News Insight */}
      {newsInsight && (
        <div className="mt-2 text-xs text-blue-200 italic flex items-start">
          <NewspaperIcon className="w-4 h-4 mr-1 text-blue-400" />
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {newsInsight.length > 80
              ? newsInsight.slice(0, 80) + "..."
              : newsInsight}
          </a>
        </div>
      )}
    </div>
  );
}

export default MatchCard;