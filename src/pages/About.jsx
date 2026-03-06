import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const About = () => {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [skillsData, expData, testimonialData] = await Promise.all([
        supabase.from('skills').select('*').order('display_order'),
        supabase.from('experiences').select('*').order('start_date', { ascending: false }),
        supabase.from('testimonials').select('*').eq('featured', true)
      ]);

      setSkills(skillsData.data || []);
      setExperiences(expData.data || []);
      setTestimonials(testimonialData.data || []);
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-20"
        >
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            About Me
          </span>
          <h1 className="text-6xl md:text-8xl font-display leading-tight dark:text-white">
            Crafting Digital <br/>
            <span className="font-serif italic text-primary">Experiences</span>
          </h1>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          <div>
            <img
              src="/images/about.jpg"
              alt="Muhammad Abdullah"
              className="rounded-2xl w-full"
            />
          </div>
          <div className="space-y-6">
            <p className="text-2xl font-display dark:text-white leading-relaxed">
              I'm Muhammad Abdullah, an AI Automation Engineer and Custom Software Developer based in New York.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              With over 8 years of experience in software development and a deep focus on AI integration, 
              I help businesses transform their operations through intelligent automation and custom solutions. 
              My work bridges the gap between cutting-edge AI technology and practical business applications.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I've had the privilege of working with Fortune 500 companies, innovative startups, and everything in between. 
              Each project is an opportunity to solve complex problems and create meaningful impact through technology.
            </p>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-display dark:text-white mb-12">Technical <span className="text-primary">Expertise</span></h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="space-y-2"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-primary">{skill.proficiency}%</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-display dark:text-white mb-12">Experience & <span className="text-primary">Education</span></h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-primary/30"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-1 text-sm text-primary">
                  {new Date(exp.start_date).getFullYear()} - {exp.current ? 'Present' : new Date(exp.end_date).getFullYear()}
                </div>
                <h3 className="text-xl font-display dark:text-white mb-1">{exp.title}</h3>
                <p className="text-slate-500 mb-2">{exp.company}</p>
                <p className="text-slate-600 dark:text-slate-400">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <motion.section
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display dark:text-white mb-12">Client <span className="text-primary">Feedback</span></h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-slate-50 dark:bg-card-dark rounded-2xl"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-yellow-500 text-sm">
                        {i < testimonial.rating ? 'star' : 'star_border'}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    {testimonial.client_image && (
                      <img
                        src={testimonial.client_image}
                        alt={testimonial.client_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h4 className="font-bold">{testimonial.client_name}</h4>
                      <p className="text-sm text-slate-500">
                        {testimonial.client_title}, {testimonial.client_company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.div>
  );
};

export default About;