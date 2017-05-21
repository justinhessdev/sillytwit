import React from 'react';
import { PropHandleLoadMore } from '../MyPropTypes';

export default function LoadMore(props) {
  LoadMore.propTypes = {
    handleLoadMore: PropHandleLoadMore.isRequired,
  };

  return (
    <div id="componentLoadMore">
      <button id="buttonLoadMore" onClick={props.handleLoadMore}>Load More Reviews</button>
    </div>
  );
}
