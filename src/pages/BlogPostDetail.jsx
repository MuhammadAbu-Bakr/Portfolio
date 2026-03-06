import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      // Fetch main post
      const { data: postData, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (postError) throw postError;
      setPost(postData);

      // Increment view count
      await supabase
        .from('blog_posts')
        .update({ views: (postData.views || 0) + 1 })
        .eq('id', postData.id);

      // Fetch related posts (same category)
      const { data: relatedData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', postData.category)
        .neq('id', postData.id)
        .eq('published', true)
        .limit(3);

      setRelatedPosts(relatedData || []);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!post) return <div>Post not found</div>;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 lg:px-20 py-16"
    >
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Insights
        </Link>

        <div className="mb-8">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">
            {post.category}
          </span>
          <h1 className="text-5xl md:text-7xl font-display dark:text-white mt-4 mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-slate-500">
            <span>{format(new Date(post.published_at), 'MMMM dd, yyyy')}</span>
            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
            <span>{post.read_time} min read</span>
            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
            <span>{post.views || 0} views</span>
          </div>
        </div>

        {post.cover_image && (
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-slate-100 dark:bg-card-dark text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-5xl mx-auto mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-2xl font-display dark:text-white mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map(related => (
              <Link
                key={related.id}
                to={`/blog/${related.slug}`}
                className="group"
              >
                {related.cover_image && (
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img
                      src={related.cover_image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <h4 className="font-display text-lg dark:text-white group-hover:text-primary transition-colors">
                  {related.title}
                </h4>
                <p className="text-sm text-slate-500 mt-2">
                  {format(new Date(related.published_at), 'MMM dd, yyyy')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
};

export default BlogPostDetail;