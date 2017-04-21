import React from "react"

import Keyword from "./Keyword"
import Rating from "./Rating"
import ReviewList from "./ReviewList"
import Total from "./Total"
import LoadMore from "./LoadMore"

export default class Layout extends React.Component {

/*
Constructor for Layout component. Doesn't do much now
*/
  constructor() {
    super()
    this.state = {
      reviews: [],
      total: 0
    }
  }

/*
When component mounts we fetch the twitter reviews using the Appfigures API --
loading by default the first 25 reviews

process.env.REACT_APP_APPFIGURES_URL --- hiding the url
*/
  componentWillMount() {

      var self = this
      const fetchReviews = fetch(process.env.REACT_APP_APPFIGURES_URL, {credentials: 'same-origin'})

      function loadMyReviews(data) {
        data.json().then((jsonData) => {
          self.setReviews(jsonData)
        })
      }

      fetchReviews.then(loadMyReviews)
    }

    setReviews(data) {
      console.log("data received from URL is: ");
      console.log(data);
      var reviewArr = []
      data.reviews.map((r) => {
        reviewArr.push(r)
      })

      // console.log("New reviewArr is: ");
      // console.log(reviewArr);
      //
      // console.log("current reviews are: ")
      // console.log(this.state.reviews)

      this.setState({
        reviews: this.state.reviews.concat(reviewArr),
        total: data.total
      })

      console.log("After merging arrays, new review array is: ")
      console.log(this.state.reviews)

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
            <Total total={this.state.total}/>
            <ReviewList reviews={this.state.reviews}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-10">
            <LoadMore setReviews={this.setReviews.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}
