import React from 'react';
import Preamble from './components/Preamble';
import Content from './components/Content';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div id="preamble">
        <Preamble />
      </div>
      <div className="content">
        <Content />
      </div>
    </div>
  );
};

export default App; 