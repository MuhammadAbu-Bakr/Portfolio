import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: '',
    technologies: [],
    main_image: '',
    gallery_images: [],
    live_url: '',
    github_url: '',
    challenge: '',
    solution: '',
    role: '',
    results: {},
    featured: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    setProjects(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.slug) {
      formData.slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    if (editingProject) {
      await supabase
        .from('projects')
        .update(formData)
        .eq('id', editingProject.id);
    } else {
      await supabase
        .from('projects')
        .insert([formData]);
    }

    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      category: '',
      technologies: [],
      main_image: '',
      gallery_images: [],
      live_url: '',
      github_url: '',
      challenge: '',
      solution: '',
      role: '',
      results: {},
      featured: false
    });
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData(project);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-12 p-6 bg-slate-50 dark:bg-card-dark rounded-xl">
        <h2 className="text-2xl font-display mb-6">
          {editingProject ? 'Edit Project' : 'Add New Project'}
        </h2>
        
        <div className="grid gap-6">
          <input
            type="text"
            placeholder="Project Title"
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
            placeholder="Short Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
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
              type="text"
              placeholder="Technologies (comma-separated)"
              value={formData.technologies.join(', ')}
              onChange={(e) => setFormData({ 
                ...formData, 
                technologies: e.target.value.split(',').map(tech => tech.trim()) 
              })}
              className="px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
            />
            
            <input
              type="text"
              placeholder="Main Image URL"
              value={formData.main_image}
              onChange={(e) => setFormData({ ...formData, main_image: e.target.value })}
              className="px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
            />
            
            <input
              type="text"
              placeholder="Live URL"
              value={formData.live_url}
              onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
              className="px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
            />
            
            <input
              type="text"
              placeholder="GitHub URL"
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className="px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
            />
            
            <input
              type="text"
              placeholder="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
            />
          </div>
          
          <textarea
            placeholder="Challenge"
            value={formData.challenge}
            onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
            rows="4"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
          />
          
          <textarea
            placeholder="Solution"
            value={formData.solution}
            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
            rows="4"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800"
          />
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 text-primary"
            />
            <span>Featured Project</span>
          </label>
        </div>
        
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            {editingProject ? 'Update' : 'Add'} Project
          </button>
          
          {editingProject && (
            <button
              type="button"
              onClick={() => {
                setEditingProject(null);
                setFormData({
                  title: '',
                  slug: '',
                  description: '',
                  category: '',
                  technologies: [],
                  main_image: '',
                  gallery_images: [],
                  live_url: '',
                  github_url: '',
                  challenge: '',
                  solution: '',
                  role: '',
                  results: {},
                  featured: false
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
        {projects.map(project => (
          <div
            key={project.id}
            className="p-4 bg-slate-50 dark:bg-card-dark rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-slate-500">
                {project.category} • {project.technologies?.length || 0} technologies
                {project.featured && ' • ⭐ Featured'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
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

export default ProjectManager;