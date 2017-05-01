import React from "react";

export default function Keyword(props){

  const divStyle = {
    marginLeft: '20px'
  }

  return (
    <div style={divStyle} id="componentKeyword">
      <h6>Filter by keyword</h6>
      <label className="sr-only" htmlFor="inputKeyword">keyword</label>
      <input className="form-control" id="inputKeyword" type='text' onBlur={props.onBlur} placeholder="enter keyword"/>
    </div>
  )
}
