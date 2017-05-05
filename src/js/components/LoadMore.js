import React from 'react';

export default function LoadMore(props) {
  const divStyle = {
    marginLeft: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    background: '#dddddd',
    border: '1px solid black',
  };

  const buttonStyle = {
    height: '50px',
    width: '100%',
    display: 'block',
  };

  return (
    <div style={divStyle} id="componentTotal">
      <button style={buttonStyle} onClick={props.handleLoadMore}>Load More Reviews</button>
    </div>
  );
}
