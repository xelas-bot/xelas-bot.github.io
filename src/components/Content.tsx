import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TravelContent from './TravelContent';

// Home page content (original content)
const HomeContent: React.FC = () => {
  return (
    <div>
      <p>
      I'm broadly interested in highly distributed and performant
      systems, statistical modeling, and machine learning. Previously, I helped organize <a href="https://cs128.org/archives/2021c/directory">cs126</a> as a CA and 
      also conducted post graduate research on <a href="https://www.linkedin.com/in/shrey-patel-b3b08a186/overlay/1635554774569/single-media-viewer/?profileId=ACoAACvLMd8BmzrZLjs82yHPrWkubdVxWfQy-iw">adversarial attacks</a> and perception/controls for self driving cars
      </p>
      
      <h3>Currently</h3>
      
      <ul>
        <li>Working on options market making strategies at <a href="https://www.virtu.com/">Virtu Financial</a></li>
        <li><Link to="/travel">Traveling the world</Link></li>
        <li>Training to dunk a basketball</li>
        <li>在学习中文 (Learning Chinese)</li>
      </ul>
    </div>
  );
};

// Blank page components for now
const BlogContent: React.FC = () => <div><h2>Blog</h2><p>Coming soon...</p></div>;
const ExperienceContent: React.FC = () => <div><h2>Experience</h2><p>Coming soon...</p></div>;
const ProjectsContent: React.FC = () => <div><h2>Projects</h2><p>Coming soon...</p></div>;

const Content: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeContent />} />
      <Route path="/blog" element={<BlogContent />} />
      <Route path="/experience" element={<ExperienceContent />} />
      <Route path="/projects" element={<ProjectsContent />} />
      <Route path="/travel" element={<TravelContent />} />
    </Routes>
  );
};

export default Content; 