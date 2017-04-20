import React from "react";

export default class Keyword extends React.Component{

/*
Constructor for keyword component. Doesn't do much now
*/
  constructor() {
    super()
  }

/*
Rendering keyword Component. Doesn't do much now
*/
  render() {

    const divStyle = {
      marginLeft: '20px'
    }

    return (
      <div style={divStyle} id="componentKeyword">
        <h6>Filter by keyword</h6>
        <label className="sr-only" htmlFor="inputKeyword">keyword</label>
        <input className="form-control" id="inputKeyword" type='text' ref='newKeyword' placeholder="enter keyword"/>
      </div>
    )
  }
}
