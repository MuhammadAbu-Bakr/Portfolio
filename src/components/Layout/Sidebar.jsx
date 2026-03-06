import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

const navItems = [
  { path: '/', icon: '🏠', label: 'Home' },
  { path: '/about', icon: '👤', label: 'About' },
  { path: '/work', icon: '💻', label: 'Work' },
  { path: '/blog', icon: '📝', label: 'Insights' },
  { path: '/contact', icon: '📧', label: 'Contact' },
];

  return (
    <aside className="w-72 hidden lg:flex flex-col fixed h-screen bg-background-light dark:bg-background-dark border-r border-slate-200 dark:border-slate-800 p-8 z-40">
      <div className="mb-12 flex flex-col items-center text-center">
        <motion.div 
          className="relative mb-6 group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000"></div>
          <img 
            alt="Muhammad Abu-Bakr" 
            className="relative w-28 h-28 rounded-full border-2 border-primary object-cover"
            src="/images/profile.jpg"
          />
        </motion.div>
        <h1 className="text-xl font-bold tracking-tight dark:text-white">Muhammad Abu-Bakr</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-widest leading-relaxed">
          AI Automation & Custom Software Developer
        </p>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:bg-slate-100 dark:hover:bg-card-dark group ${
              location.pathname === item.path ? 'bg-slate-100 dark:bg-card-dark' : ''
            }`}
          >
            <span className={`material-symbols-outlined ${
              location.pathname === item.path ? 'text-primary' : 'text-slate-400 group-hover:text-primary'
            }`}>
              {item.icon}
            </span>
            <span className={`font-medium ${
              location.pathname === item.path ? 'text-primary' : ''
            }`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

<div className="pt-8 border-t border-slate-200 dark:border-slate-800">
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-card-dark transition-all"
  >
    <span className="text-xl text-slate-400">
      {darkMode ? '🌙' : '☀️'}
    </span>
    <span className="font-medium">{darkMode ? 'Dark' : 'Light'} Mode</span>
  </button>
</div>

      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-widest text-slate-500">
        © 2026 Abu-BAkr. <br/>All Rights Reserved.
      </div>
    </aside>
  );
};

export default Sidebar;