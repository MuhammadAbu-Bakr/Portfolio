import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  const fetchProjects = async () => {
    try {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      setProjects(data || []);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data?.map(p => p.category) || [])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 lg:px-20 py-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-20"
        >
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Portfolio
          </span>
          <h1 className="text-6xl md:text-8xl font-display leading-tight dark:text-white">
            Selected <br/>
            <span className="font-serif italic text-primary">Projects</span>
          </h1>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'border border-slate-200 dark:border-slate-800 hover:border-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/work/${project.slug}`} className="group block">
                  <div className="relative h-80 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={project.main_image || '/images/placeholder.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white text-sm mb-2">{project.category}</p>
                        <h3 className="text-white text-xl font-display">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-display dark:text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies?.slice(0, 3).map(tech => (
                      <span key={tech} className="text-xs px-2 py-1 bg-slate-100 dark:bg-card-dark rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">
              folder_off
            </span>
            <h3 className="text-2xl font-display dark:text-white mb-2">No projects found</h3>
            <p className="text-slate-500">Try selecting a different category.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Work;