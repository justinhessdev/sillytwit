import React from 'react';
import { PropOnBlur } from '../MyPropTypes';

export default function Keyword(props) {
  Keyword.propTypes = {
    onBlur: PropOnBlur.isRequired,
  };

  return (
    <div id="componentKeyword">
      <h6>Filter by keyword</h6>
      <label className="sr-only" htmlFor="inputKeyword">keyword</label>
      <input
        className="form-control" id="inputKeyword" type="text"
        onBlur={props.onBlur} placeholder="enter keyword"
      />
    </div>
  );
}
