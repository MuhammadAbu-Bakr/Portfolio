import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="lg:hidden bg-background-light dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/images/profile.jpg" 
            alt="Muhammad Abu-Bakr"
            className="w-10 h-10 rounded-full border border-primary"
          />
          <span className="font-display text-lg">Muhammad Abu-Bakr</span>
        </Link>
        
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-card-dark rounded-lg transition-colors">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;