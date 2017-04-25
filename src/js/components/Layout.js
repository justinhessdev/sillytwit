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
  constructor(props) {
    super(props)
    // console.log("In Layout - props is");
    // console.log(props);
    this.state = {
      reviews: [],
      total: 0,
      pages: 1,
      url: process.env.REACT_APP_APPFIGURES_URL,
      keyword: '',
      rating: '' // value of ratings drop down
    }

    this.setReviews = this.setReviews.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.onBlur = this.onBlur.bind(this)
    this.handleRating = this.handleRating.bind(this)
  }

/*
When component mounts we fetch the twitter reviews using the Appfigures API --
loading by default the first 25 reviews

process.env.REACT_APP_APPFIGURES_URL --- hiding the url
*/
  componentWillMount() {

    // console.log("in componentWillMount from the Layout");
      var self = this
      const fetchReviews = fetch(this.state.url, {credentials: 'same-origin'})

      function loadMyReviews(data) {
        data.json().then((jsonData) => {
          self.setReviews(jsonData)
        })
      }

      fetchReviews.then(loadMyReviews)
    }

    setReviews(data) {
      // console.log("data received from URL is: ");
      // console.log(data);
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

      // console.log("After merging arrays, new review array is: ")
      // console.log(this.state.reviews)

    }

    resetReviews(data) {
      // console.log("data received from URL is: ");
      // console.log(data);
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
        reviews: reviewArr,
        total: data.total
      })
    }

    handleLoadMore() {
      var self = this

      this.setState({
        pages: this.state.pages+1
      }, () => loadPaginatedMessages())

      function loadPaginatedMessages() {
        var url = self.generateURL(self.state.url, self.state.pages, self.state.keyword, self.state.rating)

        console.log("paginated url is " + url);
        const fetchReviews = fetch(url, {credentials: 'same-origin'})

        function loadMyReviews(data) {
          data.json().then((jsonData) => {
            // console.log("Sending the jsonData to props in Layout");
            self.setReviews(jsonData)
          })
        }

        fetchReviews.then(loadMyReviews)
      }
    }

    generateURL(host, pages, keyword, rating) {
      var url
      if(keyword=='' && rating ==''){
        url = host+'?page='+pages
      } else if(keyword=='') {
        url = host+'?page='+pages+'&stars='+rating
      } else if(rating==''){
        url = host+'?page='+pages+'&q='+keyword
      } else {
       url = host+'?page='+pages+'&q='+keyword+'&stars='+rating
     }

     return url
    }

    // handleChange(event) {
    //   console.log("in Layour - input field value is: ");
    //     console.log(event.target.value);
    // }

    onBlur(event) {
      var self = this
      // console.log(event.target.value);
      var keyword = event.target.value
      this.setState({
        keyword: keyword,
        pages: 1
      }, ()=> updateURLWithKeyword())

      function updateURLWithKeyword() {
        console.log("new keyword state is " + self.state.keyword);
        var url = self.generateURL(self.state.url, self.state.pages, self.state.keyword, self.state.rating)
        console.log("filtered url is: " + url);
        const fetchReviews = fetch(url, {credentials: 'same-origin'})

        function loadMyReviews(data) {
          data.json().then((jsonData) => {
            // console.log("Sending the jsonData to props in Layout");
            self.resetReviews(jsonData)
          })
        }

        fetchReviews.then(loadMyReviews)
      }
    }

    handleRating(evt) {
      var self = this
      var rating = evt.target.value
      this.setState({
        rating: rating,
        pages: 1
      }, ()=> updateURLWithRating())

      function updateURLWithRating() {
        console.log("rating is "+self.state.value)
        var url = self.generateURL(self.state.url, self.state.pages, self.state.keyword, self.state.rating)
        console.log("filtered url is: " + url);
        const fetchReviews = fetch(url, {credentials: 'same-origin'})

        function loadMyReviews(data) {
          data.json().then((jsonData) => {
            // console.log("Sending the jsonData to props in Layout");
            self.resetReviews(jsonData)
          })
        }

        fetchReviews.then(loadMyReviews)
      }
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
            <Keyword onBlur={this.onBlur}/>
          </div>
          <div className="col-xs-2">
            <Rating rating={this.state.rating} handleRating={this.handleRating}/>
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
            <LoadMore handleLoadMore={this.handleLoadMore} peach="fuzz"/>
          </div>
        </div>
      </div>
    )
  }
}
