import IntegrationArea from '../components/Integration/IntegrationArea';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useState } from 'react';

const Integration = () => {
  return (
    <div
      className="container-fluid vh-100"
      style={{
        width: '100vw',
        height: '100vh',
        background: 'white',
        // marginTop: '2rem',
      }}
    >
      <IntegrationArea />
    </div>
  );
};

export default Integration;
