import React from "react";

export default class Rating extends React.Component{

  constructor() {
    super()
    this.state = {
      value: 'blank'
    }
  }

  handleChange(evt) {
    this.setState(
      {value: evt.target.value}
    )
  }

  render() {
    return (
      <div>
        <h6>Filter by rating</h6>
        <label className="sr-only" htmlFor="ctxSelect">Send custom context</label>
        <select id="ctxSelect" value={this.state.value} onChange={this.handleChange.bind(this)}>
          <option value="blank" ></option>
          <option value="food">I want food</option>
          <option value="work">I want work</option>

        </select>
      </div>
    )
  }
}
