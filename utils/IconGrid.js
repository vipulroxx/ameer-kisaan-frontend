import React from 'react';
import { FaCloudSun, FaTractor, FaLeaf } from 'react-icons/fa'; // Use Font Awesome or Material Icons
import './IconGrid.css';

const IconGrid = () => {
  return (
    <div className="icon-grid">
      <div className="icon-item">
        <FaCloudSun size={50} />
        <p>Weather</p>
      </div>
      <div className="icon-item">
        <FaTractor size={50} />
        <p>Machinery</p>
      </div>
      <div className="icon-item">
        <FaLeaf size={50} />
        <p>Crop</p>
      </div>
    </div>
  );
};

export default IconGrid;
