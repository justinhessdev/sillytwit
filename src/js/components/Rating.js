import React from "react";

export default class Rating extends React.Component{

/*
Setting constructor with state for drop down list.
Setting default to blank
*/
  constructor() {
    super()
    this.state = {
      value: 'blank'
    }
  }

/*
This is where onChange gets handled --
When the user selects a different rating
*/
  handleChange(evt) {
    this.setState(
      {value: evt.target.value}
    )
  }

/*
Rendering the drop down list with a defaut value,
change event handler, and a few ratings options
*/
  render() {
    return (
      <div>
        <h6>Filter by rating</h6>
        <label className="sr-only" htmlFor="selectRating">Send custom context</label>
        <select id="selectRating" value={this.state.value} onChange={this.handleChange.bind(this)}>
          <option value="blank" ></option>
          <option value="food">I want food</option>
          <option value="work">I want work</option>
        </select>
      </div>
    )
  }
}
