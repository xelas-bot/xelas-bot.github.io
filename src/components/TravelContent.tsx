import React from 'react';

const TravelContent: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h2>Travel</h2>
      <p>Explore my travel adventures visualized on this interactive globe.</p>
      <iframe 
        src="/globe.html" 
        title="Travel Globe" 
        style={{ 
          width: '150%', 
          height: 'calc(100vh - 150px)', 
          border: 'none',
          marginTop: '10px'
        }}
      />
    </div>
  );
};

export default TravelContent; 