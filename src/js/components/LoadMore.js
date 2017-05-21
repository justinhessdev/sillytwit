import React, { PropTypes } from 'react';

export default function LoadMore(props) {
  LoadMore.propTypes = {
    handleLoadMore: PropTypes.func.isRequired,
  };

  return (
    <div id="componentLoadMore">
      <button id="buttonLoadMore" onClick={props.handleLoadMore}>Load More Reviews</button>
    </div>
  );
}
