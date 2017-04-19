import React from "react";

export default class Keyword extends React.Component{

  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h6>Filter by keyword</h6>
        <label className="sr-only" htmlFor="inputKeyword">keyword</label>
        <input className="form-control" id="inputKeyword" type='text' ref='newKeyword' placeholder="enter keyword"/>
      </div>
    )
  }
}
