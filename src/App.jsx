import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Layout/Sidebar';
import AnimatedCursor from './components/UI/AnimatedCursor';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <AnimatedCursor />
      <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
        <Sidebar />
        <main className="flex-1 lg:ml-72">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<WorkDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;