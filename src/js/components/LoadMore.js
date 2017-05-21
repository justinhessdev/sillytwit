import React from 'react';
import { HandleLoadMore } from '../MyPropTypes';

export default function LoadMore(props) {
  LoadMore.propTypes = {
    handleLoadMore: HandleLoadMore.isRequired,
  };

  return (
    <div id="componentLoadMore">
      <button id="buttonLoadMore" onClick={props.handleLoadMore}>Load More Reviews</button>
    </div>
  );
}
