import React from "react";
import "./Feature.css";

interface FeatureProps {
  title: string;
  text: string;
}

const Feature: React.FC<FeatureProps> = ({ title, text }) => (
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
