import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const WorkDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setProject(data);

      // Increment view count
      await supabase
        .from('projects')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!project) return <div>Project not found</div>;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 lg:px-20 py-16"
    >
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Projects
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">
            {project.category}
          </span>
          <h1 className="text-5xl md:text-7xl font-display dark:text-white mt-4 mb-6">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-slate-500">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>{project.views || 0} views</span>
            </div>
            {project.technologies && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">code</span>
                <span>{project.technologies.length} technologies</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Image */}
        {project.main_image && (
          <div className="relative h-[500px] rounded-2xl overflow-hidden mb-12">
            <img
              src={project.main_image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Project Links */}
        <div className="flex gap-4 mb-12">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              View Live Project
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-full font-medium hover:border-primary transition-colors"
            >
              View Source Code
            </a>
          )}
        </div>

        {/* Project Details */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-display dark:text-white mb-4">Overview</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {project.description}
              </p>
            </section>

            {project.challenge && (
              <section>
                <h2 className="text-2xl font-display dark:text-white mb-4">The Challenge</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.challenge}
                </p>
              </section>
            )}

            {project.solution && (
              <section>
                <h2 className="text-2xl font-display dark:text-white mb-4">The Solution</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.solution}
                </p>
              </section>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">My Role</h3>
              <p className="text-slate-600 dark:text-slate-400">{project.role || 'Lead Developer'}</p>
            </div>

            {project.technologies && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-100 dark:bg-card-dark rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.results && Object.keys(project.results).length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Key Results</h3>
                <ul className="space-y-2">
                  {Object.entries(project.results).map(([key, value]) => (
                    <li key={key} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      <span className="text-slate-600 dark:text-slate-400">{key}: {value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        {project.gallery_images && project.gallery_images.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display dark:text-white mb-8">Project Gallery</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {project.gallery_images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} - ${index + 1}`}
                  className="rounded-xl w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.article>
  );
};

export default WorkDetail;