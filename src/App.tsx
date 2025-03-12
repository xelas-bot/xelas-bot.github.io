import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Preamble from './components/Preamble';
import Content from './components/Content';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <div id="preamble">
          <Preamble />
        </div>
        <div className="content">
          <Content />
        </div>
      </div>
    </Router>
  );
};

export default App; 