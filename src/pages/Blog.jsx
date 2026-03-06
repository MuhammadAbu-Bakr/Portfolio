import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import BlogCard from '../components/Blog/BlogCard';
import CategoryFilter from '../components/Blog/CategoryFilter';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, selectedCategory, searchQuery]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;

      setPosts(data);
      
      // Extract unique categories
      const uniqueCategories = ['All Topics', ...new Set(data.map(post => post.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    if (selectedCategory !== 'All Topics') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 lg:px-20 py-16"
    >
      <header className="max-w-5xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
            >
              Our Journal
            </motion.span>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-display leading-tight dark:text-white"
            >
              Insights & <br/>
              <span className="font-serif italic text-primary">Perspectives</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full md:w-80"
          >
            <div className="relative">
              <input
                className="w-full bg-slate-100 dark:bg-card-dark border-none rounded-full py-4 px-6 focus:ring-2 focus:ring-primary text-sm transition-all"
                placeholder="Search articles..."
                type="text"
                value={searchQuery}
                onChange={handleSearch}
              />
              <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </motion.div>
      </header>

      <section className="max-w-5xl mx-auto space-y-1">
        <AnimatePresence mode="wait">
          {currentPosts.length > 0 ? (
            currentPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">
                article
              </span>
              <h3 className="text-2xl font-display dark:text-white mb-2">No articles found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {totalPages > 1 && (
        <footer className="max-w-5xl mx-auto pt-20 flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          
          <div className="flex items-center gap-2">
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-full font-medium transition-all ${
                    currentPage === pageNum
                      ? 'bg-primary text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-card-dark'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="px-2">...</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-card-dark font-medium"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </footer>
      )}
    </motion.div>
  );
};

export default Blog;