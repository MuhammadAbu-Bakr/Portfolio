import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    read_time: 5,
    published: false,
    cover_image: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Generate slug from title if not provided
    if (!formData.slug) {
      formData.slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    if (editingPost) {
      await supabase
        .from('blog_posts')
        .update(formData)
        .eq('id', editingPost.id);
    } else {
      await supabase
        .from('blog_posts')
        .insert([{ ...formData, published_at: new Date() }]);
    }

    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [],
      read_time: 5,
      published: false,
      cover_image: ''
    });
    fetchPosts();
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData(post);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await supabase.from('blog_posts').delete().eq('id', id);
      fetchPosts();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-12 p-6 bg-slate-50 dark:bg-card-dark rounded-xl">
        <h2 className="text-2xl font-display mb-6">
          {editingPost ? 'Edit Post' : 'Create New Post'}
        </h2>
        
        <div className="grid gap-6">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
            required
          />
          
          <input
            type="text"
            placeholder="Slug (optional)"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
          />
          
          <textarea
            placeholder="Excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows="3"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
            required
          />
          
          <textarea
            placeholder="Content (Markdown)"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows="10"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 font-mono"
            required
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
              required
            />
            
            <input
              type="number"
              placeholder="Read Time (minutes)"
              value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
              className="px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
              required
            />
            
            <input
              type="text"
              placeholder="Cover Image URL"
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              className="px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
            />
            
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData({ 
                ...formData, 
                tags: e.target.value.split(',').map(tag => tag.trim()) 
              })}
              className="px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
            />
          </div>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-5 h-5 text-primary"
            />
            <span>Published</span>
          </label>
        </div>
        
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            {editingPost ? 'Update' : 'Create'} Post
          </button>
          
          {editingPost && (
            <button
              type="button"
              onClick={() => {
                setEditingPost(null);
                setFormData({
                  title: '',
                  slug: '',
                  excerpt: '',
                  content: '',
                  category: '',
                  tags: [],
                  read_time: 5,
                  published: false,
                  cover_image: ''
                });
              }}
              className="px-6 py-3 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4">
        {posts.map(post => (
          <div
            key={post.id}
            className="p-4 bg-slate-50 dark:bg-card-dark rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-slate-500">
                {new Date(post.created_at).toLocaleDateString()} • {post.read_time} min read
                {post.published ? ' • Published' : ' • Draft'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(post)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;