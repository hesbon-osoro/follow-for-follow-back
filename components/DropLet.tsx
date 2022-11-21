import React, { useState } from 'react';

const DropLet = () => {
  const colors = [
    '#1d7eca',
    '#9cd3db',
    '#d5f4fd',
    '#007577',
    '#0c71c3',
    '#2ea3f2',
    '#b6dfe9',
    '#d8d9d9',
    '#ffea1f',
    '#06dda5',
    '#0b8b88',
    '#0d3a78',
  ];
  const [colorIndex, setColorIndex] = useState(0);

  const changeColor = () => {
    setColorIndex(Math.floor(Math.random() * colors.length));
    const color = colors[colorIndex];
    document.documentElement.style.setProperty('--droplet-color', color);
  };

  return (
    <div className="wrapper" onAnimationIteration={changeColor}>
      <div className="wrap">
        <div className="drop-outer">
          <div className="drop-wrap">
            <svg
              className="drop"
              viewBox="0 0 40 40"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" />
            </svg>
          </div>
        </div>
        <div className="ripple ripple-">
          <svg
            className="ripple-svg"
            viewBox="0 0 60 60"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="24" />
          </svg>
        </div>
        <div className="ripple ripple-2">
          <svg
            className="ripple-svg"
            viewBox="0 0 60 60"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="24" />
          </svg>
        </div>
        <div className="ripple ripple-3">
          <svg
            className="ripple-svg"
            viewBox="0 0 60 60"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="24" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DropLet;
