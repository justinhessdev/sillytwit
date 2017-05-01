import React from "react";

export default class Keyword extends React.Component{

  constructor(props) {
    super(props)
  }

  render() {

    const divStyle = {
      marginLeft: '20px'
    }

    return (
      <div style={divStyle} id="componentKeyword">
        <h6>Filter by keyword</h6>
        <label className="sr-only" htmlFor="inputKeyword">keyword</label>
        <input className="form-control" id="inputKeyword" type='text' onBlur={this.props.onBlur} ref='newKeyword' placeholder="enter keyword"/>
      </div>
    )
  }
}
