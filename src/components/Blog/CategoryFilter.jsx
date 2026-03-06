import React from 'react';
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <motion.div 
      className="flex flex-wrap gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {categories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.05 }}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;