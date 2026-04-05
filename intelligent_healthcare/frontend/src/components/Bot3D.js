import React from 'react';
import './Bot3D.css';

function Bot3D({ onClick }) {
  return (
    <div className="bot-3d-container" onClick={onClick}>
      <div className="bot-3d">
        <div className="bot-head">
          <div className="bot-eye left"></div>
          <div className="bot-eye right"></div>
          <div className="bot-antenna"></div>
        </div>
        <div className="bot-body-3d">
          <div className="bot-light"></div>
        </div>
        <div className="bot-arm left-arm"></div>
        <div className="bot-arm right-arm waving"></div>
      </div>
    </div>
  );
}

export default Bot3D;
