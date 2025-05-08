import React from "react";

function Header() {
  return (
    <div className="flex flex-col items-center text-center py-6 sm:py-10">
      <h1 className="text-sm text-gray-300 mb-1 sm:text-base">SmartStake Assistant</h1>

      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-4 border-yellow-500 rounded-full overflow-hidden mb-4">
        <img
          src="/avatar-512.jpg" // ✅ updated for PWA
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-yellow-300 text-2xl sm:text-3xl md:text-4xl font-extrabold">
        Your betting picks
      </h2>
    </div>
  );
}

export default Header;