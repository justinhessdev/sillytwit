import React from 'react';

import Keyword from './Keyword';
import Rating from './Rating';
import ReviewList from './ReviewList';
import Total from './Total';
import LoadMore from './LoadMore';
import LoadingSpinner from './LoadingSpinner';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      reviewTypeList: {},
      total: 0,
      pages: 1,
      url: process.env.REACT_APP_APPFIGURES_URL,
      keyword: '',
      rating: '',
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleRating = this.handleRating.bind(this);
  }

/*
When component mounts we fetch the twitter reviews using the Appfigures API --
loading by default the first 25 reviews

process.env.REACT_APP_APPFIGURES_URL --- hiding the url
*/

  /* global fetch*/
  componentDidMount() {
    const self = this;
    function loadMyReviews(data) {
      data.json()
        .then((jsonData) => {
          console.log(jsonData.reviews);
          self.setState({
            reviews: self.state.reviews.concat(jsonData.reviews),
            total: jsonData.total,
          });

          self.sectionReviews();
        });
    }

    fetch(this.state.url, { credentials: 'same-origin' }).then(loadMyReviews);
  }

  onBlur(event) {
    const self = this;
    const keyword = event.target.value;

    function updateURLWithKeyword() {
      const url = self.generateURL(
        self.state.url,
        self.state.pages,
        self.state.keyword,
        self.state.rating,
      );
      const fetchReviews = fetch(url, { credentials: 'same-origin' });

      function loadMyReviews(data) {
        data.json().then((jsonData) => {
          // console.log("Logging updated reviews by keyword: ")
          // console.log(jsonData);
          self.setState({
            reviews: jsonData.reviews,
            total: jsonData.total,
          });
          // console.log("logging state after receiving keyword reviews: ");
          // console.log(self.state.reviews);
          self.sectionReviews();
        });
      }

      fetchReviews.then(loadMyReviews);
    }

    this.setState({
      keyword,
      pages: 1,
    }, () => updateURLWithKeyword());
  }

  sectionReviews() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // set to midnight
    // Prepare manual dates: today, yesterday, this week, last week...
    const keys = [];
    const reviewTypeList = {};
    // keys is an array of (size 2) arrays
    keys.push(['Today/10006', new Date(currentDate)]);
    currentDate.setDate(currentDate.getDate() - 1);
    keys.push(['Yesterday/10005', new Date(currentDate)]);
    currentDate.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));
    keys.push(['This Week/10004', new Date(currentDate)]);
    currentDate.setDate(currentDate.getDate() - 7);
    keys.push(['Last Week/10003', new Date(currentDate)]);
    currentDate.setDate(1);
    keys.push(['This Month/10002', new Date(currentDate)]);
    currentDate.setMonth(currentDate.getMonth() - 1);
    keys.push(['Last Month/10001', new Date(currentDate)]);
    this.state.reviews.forEach((review) => {
      const date = review.date.substring(0, 10).replace(/-/g, '\/');
      const reviewDate = new Date(date);
      const [key, keyDate] = keys.find(([header, headerDate]) => reviewDate >= headerDate) || [];
      const dynamicKey = `${reviewDate.getMonth()}/${reviewDate.getFullYear()}`;

      // function push(myKey) {
      //   reviewTypeList[myKey].push(review);
      // }
      //
      // function createAndPush(myKey) {
      //   reviewTypeList[myKey] = [];
      //   push(myKey);
      // }

      /* Less readable ternary operator in 3 lines -- using the functions above */

      // (key)
      //   ? [(key in reviewTypeList) ? push(key) : createAndPush(key)]
      //   : [(dynamicKey in reviewTypeList) ? push(dynamicKey) : createAndPush(dynamicKey)]

      /* The More Readable version */

      if (key) { // if key is not null we are using our manually made keys
        if (!(key in reviewTypeList)) {
          reviewTypeList[key] = [];
        }
        reviewTypeList[key].push(review);
      } else { // if keys is null we are using our dynamicKeys
        if (!(dynamicKey in reviewTypeList)) {
          reviewTypeList[dynamicKey] = [];
        }
        reviewTypeList[dynamicKey].push(review);
      }
    });

    this.setState({ reviewTypeList });
    console.log(reviewTypeList);
  }

  generateURL(host, pages, keyword, rating) {
    let url = '';
    if (keyword === '' && rating === '') {
      url = `${host}?page= ${pages}`;
    } else if (keyword === '') {
      url = `${host}?page=${pages}&stars=${rating}`;
    } else if (rating === '') {
      url = `${host}?page=${pages}&q=${keyword}`;
    } else {
      url = `${host}?page=${pages}&q=${keyword}&stars=${rating}`;
    }

    return url;
  }

  handleLoadMore() {
    const self = this;
    function loadPaginatedMessages() {
      const url = self.generateURL(
        self.state.url,
        self.state.pages,
        self.state.keyword,
        self.state.rating,
      );
      const fetchReviews = fetch(url, { credentials: 'same-origin' });

      function loadMyReviews(data) {
        data.json().then((jsonData) => {
          console.log("Logging load more reviews: ")
          console.log(jsonData);
          self.setState({
            reviews: self.state.reviews.concat(jsonData.reviews),
            total: jsonData.total,
          });

          self.sectionReviews();
        });
      }

      fetchReviews.then(loadMyReviews);
    }

    this.setState({
      pages: this.state.pages + 1,
    }, () => loadPaginatedMessages());
  }

  handleRating(evt) {
    const self = this;
    const rating = evt.target.value;
    function updateURLWithRating() {
      const url = self.generateURL(
        self.state.url,
        self.state.pages,
        self.state.keyword,
        self.state.rating,
      );
      const fetchReviews = fetch(url, { credentials: 'same-origin' });

      function loadMyReviews(data) {
        data.json().then((jsonData) => {
          self.setState({
            reviews: jsonData.reviews,
            total: jsonData.total,
          });

          self.sectionReviews();
        });
      }

      fetchReviews.then(loadMyReviews);
    }

    this.setState({
      rating,
      pages: 1,
    }, () => updateURLWithRating());
  }

/*
Renders Keyword ad Rating components so far
Bootstrap design
*/
  render() {
    return (Object.keys(this.state.reviewTypeList).length) ? (
      <div id="componentLayout">
        <div className="row">
          <div className="col-xs-8">
            <Keyword onBlur={this.onBlur} />
          </div>
          <div className="col-xs-2">
            <Rating rating={this.state.rating} handleRating={this.handleRating} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-10">
            <Total total={this.state.total} />
            <ReviewList reviewTypeList={this.state.reviewTypeList} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-10">
            <LoadMore handleLoadMore={this.handleLoadMore} />
          </div>
        </div>
      </div>
    ) : <LoadingSpinner />;
  }
}
