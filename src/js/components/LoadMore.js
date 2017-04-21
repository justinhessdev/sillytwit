import React from "react"

export default class LoadMore extends React.Component {
  constructor() {
    super()
    this.state = {
      pages: 1
    }
  }

  handleClick() {
    // var updateCount = this.state.pages+1
    // console.log("update count is: " + updateCount);

    // this.setState({
    //   pages: this.state.pages++
    // })

    var self = this

    this.setState({ pages: this.state.pages+1 }, () => {
      console.log(this.state.pages)
      console.log("new url is: ");
      console.log(process.env.REACT_APP_APPFIGURES_URL+'?page='+this.state.pages);
      var url = process.env.REACT_APP_APPFIGURES_URL+'?page='+this.state.pages
      const fetchReviews = fetch(url, {credentials: 'same-origin'})

      function loadMyReviews(data) {
        data.json().then((jsonData) => {
          console.log("Sending the jsonData to props in Layout");
          self.props.setReviews(jsonData)
        })
      }

      fetchReviews.then(loadMyReviews)
    }
    );


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
        <button style={buttonStyle} onClick={this.handleClick.bind(this)}>Load More Reviews</button>
      </div>
    )
  }
}
