import React from "react"

import Keyword from "./Keyword"
import Rating from "./Rating"

export default class Layout extends React.Component {
  constructor() {
    super()
  }
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
