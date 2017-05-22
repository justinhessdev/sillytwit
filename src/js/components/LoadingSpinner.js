import React from 'react';

const LoadingSpinner = () => (
  <div>
    <span className="Loader">
      <div className="Loader-indicator" >
        <h1 id="h1-animation">
          <span>Loading </span>
          <span className="Loader-ellipsis" >
            <span className="Loader-ellipsisDot">.</span>
            <span className="Loader-ellipsisDot">.</span>
            <span className="Loader-ellipsisDot">.</span>
          </span>
        </h1>
      </div>
    </span>
  </div>
);

export default LoadingSpinner;
