import React from 'react';
import { Link } from 'react-router-dom';




const Preamble: React.FC = () => {
  return (
    <>
      <img 
        className="preamble-picture" 
        src="/static/profile/profile.webp" 
        alt="Profile" 
        width="350px"
      />
      <strong className="preamble-name">shrey patel</strong>
      <p className="preamble-summary">
        somewhat of a computer scientist from the University of Illinois, prev at:
        <li><a href="https://www.jumptrading.com/">jump trading</a></li>
        <li><a href="https://www.imc.com/us">imc trading</a></li>
        <li><a href="https://ramp.com/">ramp</a></li>
        <li><a href="https://www.nasa.gov/">nasa</a></li>
      </p>
      <ul className="preamble-links">
        <li><a className="preamble-link" href="https://github.com/xelas-bot">GitHub</a></li>
        <li><a className="preamble-link" href="https://www.linkedin.com/in/shrey-patel-b3b08a186/">LinkedIn</a></li>
        <li><a className="preamble-link" href="#resume">Resume</a></li>
        <li><a className="preamble-link" href="mailto:shreyp941@gmail.com">@</a></li>
      </ul>
      <ul className="nav-links">
        <li><Link className="nav-link" to="/">Home</Link></li>
        <li><Link className="nav-link" to="/blog">Blog</Link></li>
        <li><Link className="nav-link" to="/experience">Experience</Link></li>
        <li><Link className="nav-link" to="/projects">Projects</Link></li>
      </ul>
    </>
  );
};

export default Preamble; 