import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="font-display text-2xl dark:text-white mb-4">
              Let's create something <span className="text-primary">exceptional</span>
            </h3>
            <p className="text-slate-500 mb-6">
              Based in NYC • Available for freelance and full-time opportunities
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener" 
                 className="w-10 h-10 rounded-full bg-slate-100 dark:bg-card-dark flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined">code</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener"
                 className="w-10 h-10 rounded-full bg-slate-100 dark:bg-card-dark flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined">business_center</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener"
                 className="w-10 h-10 rounded-full bg-slate-100 dark:bg-card-dark flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined">chat</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-slate-500">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/work" className="hover:text-primary transition-colors">Work</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Insights</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-500">
              <li>hello@abdullah.dev</li>
              <li>+1 (555) 123-4567</li>
              <li>New York, NY</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
          © 2026 Muhammad Abu-Bakr. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;