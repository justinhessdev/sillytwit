import React from "react"

export default class LoadMore extends React.Component {
  constructor(props) {
    super(props)
    // console.log("In LoadMore - props is")
    // console.log(props);
  }

  render() {
    const divStyle = {
      marginLeft: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
      background: '#dddddd',
      border: '1px solid black',
    }

    const buttonStyle = {
      width: '100%',
      display: 'block',
      height: '50px'
    }

    return (
      <div style={divStyle} id="componentTotal">
        <button style={buttonStyle} onClick={this.props.handleLoadMore}>Load More Reviews</button>
      </div>
    )
  }
}
