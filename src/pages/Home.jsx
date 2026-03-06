import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch featured projects
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .limit(3);

      // Fetch recent blog posts
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(3);

      setFeaturedProjects(projects || []);
      setRecentPosts(posts || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto mb-32">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Muhammad Abu-Bakr
          </span>
          <h1 className="text-7xl md:text-9xl font-display leading-[0.9] dark:text-white">
            Building the <br/>
            <span className="font-serif italic text-primary">Future</span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mt-8"
        >
          AI Automation Engineer & Custom Software Developer. 
          Crafting intelligent systems that bridge human intent with machine precision.
        </motion.p>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 mt-12"
        >
          <Link
            to="/work"
            className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            View My Work
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 border border-slate-200 dark:border-slate-800 rounded-full font-medium hover:border-primary transition-colors"
          >
            Let's Talk
          </Link>
        </motion.div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="max-w-5xl mx-auto mb-32">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display dark:text-white">
              Featured <span className="text-primary">Work</span>
            </h2>
            <Link to="/work" className="text-primary hover:underline hidden md:block">
              View All Projects →
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/work/${project.slug}`} className="group">
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={project.main_image || '/images/placeholder.jpg'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-xl font-display dark:text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{project.category}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <Link to="/work" className="block text-center mt-8 text-primary hover:underline md:hidden">
            View All Projects →
          </Link>
        </section>
      )}

      {/* Recent Insights */}
      {recentPosts.length > 0 && (
        <section className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display dark:text-white">
              Recent <span className="text-primary">Insights</span>
            </h2>
            <Link to="/blog" className="text-primary hover:underline hidden md:block">
              All Articles →
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="group">
                  {post.cover_image && (
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <span className="text-xs text-primary uppercase tracking-widest">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-display dark:text-white group-hover:text-primary transition-colors mt-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">{post.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <Link to="/blog" className="block text-center mt-8 text-primary hover:underline md:hidden">
            All Articles →
          </Link>
        </section>
      )}
    </motion.div>
  );
};

export default Home;