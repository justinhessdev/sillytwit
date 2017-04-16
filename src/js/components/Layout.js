import React from "react"

export default class Layout extends React.Component {
  constructor() {
    super()
    this.name = "Justin"
  }
  render() {
    return (
      <h1>{this.name} is busy!</h1>
    )
  }
}
