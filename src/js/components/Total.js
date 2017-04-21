import React from "react"

export default class Total extends React.Component {
  constructor() {
    super()
  }


  render() {
    const total = this.props.total

    const divStyle = {
      marginLeft: '20px'
    }

    return (
      <div style={divStyle} id="componentTotal">
        <label>Showing {total} Reviews</label>
      </div>
    )
  }
}
