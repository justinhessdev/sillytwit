import React from 'react';

import Keyword from './Keyword';
import Rating from './Rating';
import ReviewList from './ReviewList';
import Total from './Total';
import LoadMore from './LoadMore';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      reviewTypeList: [],
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
          self.setState({
            reviews: self.state.reviews.concat(jsonData.reviews),
            total: jsonData.total,
          });

          self.sortReviews();
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
          self.setState({
            reviews: jsonData.reviews,
            total: jsonData.total,
          });

          self.sortReviews();
        });
      }

      fetchReviews.then(loadMyReviews);
    }

    this.setState({
      keyword,
      pages: 1,
    }, () => updateURLWithKeyword());
  }

  sortReviews() {
    const currentDate = new Date(); // Or leave out the argument for actual date
    currentDate.setHours(0, 0, 0, 0); // set to midnight
    // Prepare all related dates: yesterday and last Monday
    const keys = [];
    const reviewTypeList = {};
    keys.push(['Today/10006', new Date(currentDate)]); // clone
    currentDate.setDate(currentDate.getDate() - 1);
    keys.push(['Yesterday/10005', new Date(currentDate)]); // clone
    currentDate.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));
    keys.push(['This Week/10004', new Date(currentDate)]); // clone
    currentDate.setDate(currentDate.getDate() - 7);
    keys.push(['Last Week/10003', new Date(currentDate)]); // clone
    currentDate.setDate(1);
    keys.push(['This Month/10002', new Date(currentDate)]); // clone
    currentDate.setMonth(currentDate.getMonth() - 1);
    keys.push(['Last Month/10001', new Date(currentDate)]); // clone
    this.state.reviews.forEach((review) => {
      const date = review.date.substring(0, 10).replace(/-/g, '\/');
      const reviewDate = new Date(date);
      const [key] = keys.find(([key, date]) => reviewDate >= date) || [];
      if (key && (!(key in reviewTypeList))) {
        reviewTypeList[key] = [];
      }
      if (key) {
        reviewTypeList[key].push(review);
      } else {
         // ALL OTHER MONTH / YEAR COMBINATIONS
        if (!((`${reviewDate.getMonth()}/${reviewDate.getYear()}`) in reviewTypeList)) {
          reviewTypeList[`${reviewDate.getMonth()}/${reviewDate.getFullYear()}`] = [];
        }

        reviewTypeList[`${reviewDate.getMonth()}/${reviewDate.getFullYear()}`].push(review);
      }
    });

    this.setState({ reviewTypeList });
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
          self.setState({
            reviews: self.state.reviews.concat(jsonData.reviews),
            total: jsonData.total,
          });

          self.sortReviews();
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

          self.sortReviews();
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
    return (
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
            <ReviewList reviewTypeList={this.state.reviewTypeList} reviews={this.state.reviews} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-10">
            <LoadMore handleLoadMore={this.handleLoadMore} peach="fuzz" />
          </div>
        </div>
      </div>
    );
  }
}
