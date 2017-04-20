import React from "react"

import Total from "./Total"

export default class ReviewList extends React.Component {
  constructor() {
    super()
  }

  render() {
    const divStyle = {
      marginTop: '20px',
      marginLeft: '20px',
      padding: '30px',
      border: '1px solid #dddddd'
    }

    const headerStyle = {
      fontWeight: 'bold',
      textAlign: 'center',
      background: '#dddddd',
      border: '1px solid black',
      padding: '10px'
    }
    return (
      <div style={divStyle} id="componentReviewList">
        <Total />
        <h2 style={headerStyle}>Today</h2>
        <ul class="list-group">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Morbi leo risus</li>
          <li class="list-group-item">Porta ac consectetur ac</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    )
  }
}
