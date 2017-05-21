import React from 'react';
import { OnBlur } from '../MyPropTypes';

export default function Keyword(props) {
  Keyword.propTypes = {
    onBlur: OnBlur.isRequired,
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
