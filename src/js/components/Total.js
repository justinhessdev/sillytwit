import React from "react"

export default function Total(props) {

  const divStyle = {
    marginLeft: '20px'
  }

  return (
    <div style={divStyle} id="componentTotal">
      <label>Showing {props.total} Reviews</label>
    </div>
  )
}
