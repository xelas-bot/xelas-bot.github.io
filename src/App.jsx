import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="preamble">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Profile" 
          className="preamble-picture w-24 h-24"
        />
        <h1 className="preamble-name">Your Name</h1>
        <p className="preamble-summary">
          Web Developer & Designer. I build modern websites and applications.
        </p>
        <p className="preamble-code">
          JavaScript, React, Tailwind CSS
        </p>
        <ul className="preamble-links">
          <li><a href="#" className="preamble-link">GitHub</a></li>
          <li><a href="#" className="preamble-link">LinkedIn</a></li>
          <li><a href="#" className="preamble-link">Twitter</a></li>
          <li><a href="#" className="preamble-link">Email</a></li>
        </ul>
        <ul className="nav-links mt-6">
          <li><a href="#" className="nav-link">Home</a></li>
          <li><a href="#" className="nav-link">Projects</a></li>
          <li><a href="#" className="nav-link">Blog</a></li>
          <li><a href="#" className="nav-link">Resume</a></li>
        </ul>
      </div>

      <div className="content">
        <h1>Welcome to My Personal Website</h1>
        <p>
          This is a personal website built with React, Vite, and Tailwind CSS. 
          The styling is based on the CSS you provided, implemented using Tailwind's 
          utility classes and custom components.
        </p>

        <h2>Projects</h2>
        <div className="project-container">
          <div className="project-header">
            <h3 className="m-0">Project Name</h3>
            <div className="project-links">
              <a href="#" className="project-link">Demo</a>
              <a href="#" className="project-gh-link">GitHub</a>
            </div>
          </div>
          <p>
            This is a description of the project. It explains what the project does,
            what technologies were used, and any interesting features or challenges.
          </p>
          <div className="experience-langs">
            <div className="lang">
              <span className="lang-dot javascript"></span>
              <span>JavaScript</span>
            </div>
            <div className="lang">
              <span className="lang-dot react"></span>
              <span>React</span>
            </div>
            <div className="lang">
              <span className="lang-dot typescript"></span>
              <span>TypeScript</span>
            </div>
          </div>
        </div>

        <h2>Blog Posts</h2>
        <div className="posts-container">
          <div className="post-link-container">
            <p className="post-link-date">2023-05-15</p>
            <a href="#" className="post-link">How to Build a Personal Website with React and Tailwind CSS</a>
          </div>
          <div className="post-link-container">
            <p className="post-link-date">2023-04-20</p>
            <a href="#" className="post-link">My Journey as a Web Developer</a>
          </div>
          <div className="post-link-container">
            <p className="post-link-date">2023-03-10</p>
            <a href="#" className="post-link">The Power of CSS Variables</a>
          </div>
        </div>

        <h2>Code Example</h2>
        <div className="org-src-container">
          <pre>
            <code>
{`function HelloWorld() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}`}
            </code>
          </pre>
        </div>

        <blockquote>
          <p>
            This is a blockquote. It can be used to highlight important information or to quote someone.
          </p>
        </blockquote>

        <aside>
          <p>
            This is an aside. It can be used to provide additional information that is related to the main content.
          </p>
        </aside>
      </div>
    </>
  )
}

export default App
