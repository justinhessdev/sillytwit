import React, { PropTypes } from 'react';

export default function Total(props) {
  Total.propTypes = {
    total: PropTypes.number.isRequired,
  };

  return (
    <div id="componentTotal">
      <h6>Showing {props.total} Reviews</h6>
    </div>
  );
}
