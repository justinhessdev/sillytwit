import React from 'react';
import { PropTotal } from '../MyPropTypes';

export default function Total(props) {
  Total.propTypes = {
    total: PropTotal.isRequired,
  };

  return (
    <div id="componentTotal">
      <h6>Showing {props.total} Reviews</h6>
    </div>
  );
}
