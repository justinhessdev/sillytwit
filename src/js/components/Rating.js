import React from "react";

export default class Rating extends React.Component{

/*
Setting constructor with state for drop down list.
Setting default to blank
*/
  constructor(props) {
    super(props)
  }

/*
Rendering the drop down list with a defaut value,
change event handler, and a few ratings options
*/
  render() {
    return (
      <div id="componentRating">
        <h6>Filter by rating</h6>
        <form>
          <div className="form-group">
            <label className="sr-only" htmlFor="selectRating">Select Rating:</label>
            <select className="form-control" value={this.props.rating} onChange={this.props.handleRating} id="selectRating">
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
    )
  }
}
