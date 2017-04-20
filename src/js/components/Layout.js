import React from "react"

import Keyword from "./Keyword"
import Rating from "./Rating"
import ReviewList from "./ReviewList"

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
      <div id="componentLayout">
        <div className="row">
          <div className="col-xs-8">
            <Keyword />
          </div>
          <div className="col-xs-2">
            <Rating />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-10">
            <ReviewList />
          </div>
        </div>
      </div>
    )
  }
}
