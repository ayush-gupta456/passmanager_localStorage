import React, { useState } from 'react';

const Navbar = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleContactClick = () => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <nav className="w-full text-white bg-slate-800">
      <div className="flex items-center justify-between px-4 py-5 mycontainer h-14">
        <div className="text-2xl font-bold text-white logo">
          <span className="text-purple-400">&lt; </span>
          pass<span className="text-purple-400">KEEPER/ &gt;</span>
        </div>
        <button
          className="flex items-center justify-between mx-2 my-5 text-white bg-purple-700 rounded-full ring-white ring-1"
          onClick={handleContactClick}
        >
          <img className="w-10 p-1 invert" src="/icons/github.png" alt="github logo" />
          <span className="px-2 font-bold">Contact</span>
        </button>
        {isContactOpen && (
          <div className="absolute right-0 p-4 rounded-md shadow-md top-14 bg-slate-800">
            <p className="text-sm text-gray-300">create.personal456@gmail.com</p>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar