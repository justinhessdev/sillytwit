import React from "react"

import Keyword from "./Keyword"
import Rating from "./Rating"

export default class Layout extends React.Component {

/*
Constructor for Layout component. Doesn't do much now
*/
  constructor() {
    super()
  }

/*
Renders Keyword ad Rating components so far
Bootstrap design
*/
  render() {
    return (
      <div id="layout">
        <div className="row">
          <div className="col-xs-9">
            <Keyword />
          </div>
          <div className="col-xs-3">
            <Rating />
          </div>
        </div>
      </div>
    )
  }
}
