import React, { PropTypes } from 'react';

export default function Rating(props) {
  Rating.propTypes = {
    rating: PropTypes.string.isRequired,
    handleRating: PropTypes.func.isRequired,
  };

  return (
    <div id="componentRating">
      <h6>Filter by rating</h6>
      <form>
        <div className="form-group">
          <label className="sr-only" htmlFor="selectRating">Select Rating:</label>
          <select className="form-control" value={props.rating} onChange={props.handleRating} id="selectRating">
            <option></option>
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </div>
      </form>
    </div>
  );
}
