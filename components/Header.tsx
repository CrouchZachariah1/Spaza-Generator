
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-amber-400">
          Spaza Generator
        </span>
      </h1>
      <p className="mt-3 text-lg text-gray-400 max-w-xl mx-auto">
        Crafting plausible deniability for the modern escapist.
      </p>
    </header>
  );
};

export default Header;
