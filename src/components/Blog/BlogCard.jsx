import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';

const BlogCard = ({ post, index }) => {
  const publishDate = new Date(post.published_at);
  const day = format(publishDate, 'dd');
  const month = format(publishDate, 'MMM yyyy');

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ delay: index * 0.1 }}
      className="group py-12 editorial-border hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors px-4 -mx-4 rounded-xl"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="flex flex-col md:flex-row items-start gap-8 md:gap-16"
        onClick={async () => {
          // Increment view count
          await supabase
            .from('blog_posts')
            .update({ views: (post.views || 0) + 1 })
            .eq('id', post.id);
        }}
      >
        <div className="md:w-32 flex-shrink-0">
          <span className="text-4xl md:text-5xl font-display text-slate-300 dark:text-slate-700 block mb-1">
            {day}
          </span>
          <span className="text-xs uppercase tracking-widest font-bold text-slate-400">
            {month}
          </span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {post.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
            <span className="text-xs text-slate-500 uppercase tracking-widest">
              {post.read_time} Min Read
            </span>
            {post.views > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                <span className="text-xs text-slate-500">
                  {post.views} views
                </span>
              </>
            )}
          </div>
          
          <h3 className="text-3xl md:text-4xl font-display dark:text-white mb-6 group-hover:text-primary transition-colors leading-snug">
            {post.title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-card-dark text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 group-hover:bg-primary group-hover:border-primary transition-all"
        >
          <span className="material-symbols-outlined text-slate-400 group-hover:text-white transition-colors">
            arrow_forward
          </span>
        </motion.div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;