import React from 'react';

const Preamble: React.FC = () => {
  return (
    <>
      <img 
        className="preamble-picture" 
        src="/static/profile/profile.webp" 
        alt="Profile" 
        width="250px"
      />
      <strong className="preamble-name">Shrey Patel</strong>
      <p className="preamble-summary">
        I'm a final year Computer Science and Mathematics student at Northeastern
        University interested in programming languages and developer tooling.
      </p>
      <code className="preamble-code">
        (λx.x x) (λx.x x)
      </code>
      <ul className="preamble-links">
        <li><a className="preamble-link" href="https://github.com/priime0">GitHub</a></li>
        <li><a className="preamble-link" href="https://linkedin.com/in/lucas-sta-maria">LinkedIn</a></li>
        <li><a className="preamble-link" href="#resume">Resume</a></li>
        <li><a className="preamble-link" href="mailto:lucas@priime.dev">@</a></li>
      </ul>
      <ul className="nav-links">
        <li><a className="nav-link" href="/">Home</a></li>
        <li><a className="nav-link" href="/blog">Blog</a></li>
        <li><a className="nav-link" href="/experience">Experience</a></li>
        <li><a className="nav-link" href="/about">About</a></li>
      </ul>
    </>
  );
};

export default Preamble; 