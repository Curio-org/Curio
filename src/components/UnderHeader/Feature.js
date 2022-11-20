import React from 'react';
import './Feature.css';

const Feature = ({ title, text }) => (
  <div className="curio_feature">
    <div className="curio_feature-title">
      <div />
      <h1>{title}</h1>
    </div>
    <div className="curiofeature-text">
      <p>{text}</p>
    </div>
  </div>
);

export default Feature;