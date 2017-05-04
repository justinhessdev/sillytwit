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
      total: 0,
      pages: 1,
      url: process.env.REACT_APP_APPFIGURES_URL,
      keyword: '',
      rating: '', // value of ratings drop down
    };

    this.setReviews = this.setReviews.bind(this);
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
  componentWillMount() {
    const self = this;
    const fetchReviews = fetch(this.state.url, { credentials: 'same-origin' });

    function loadMyReviews(data) {
      data.json().then((jsonData) => {
        self.setReviews(jsonData);
      });
    }

    fetchReviews.then(loadMyReviews);
  }

  onBlur(event) {
    const self = this;
    const keyword = event.target.value;

    function updateURLWithKeyword() {
      // console.log("new keyword state is " + self.state.keyword);
      const url = this.generateURL(
        self.state.url,
        self.state.pages,
        self.state.keyword,
        self.state.rating,
      );
      // console.log("filtered url is: " + url);
      const fetchReviews = fetch(url, { credentials: 'same-origin' });

      function loadMyReviews(data) {
        data.json().then((jsonData) => {
          self.resetReviews(jsonData);
        });
      }

      fetchReviews.then(loadMyReviews);
    }

    this.setState({
      keyword,
      pages: 1,
    }, () => updateURLWithKeyword());
  }

  setReviews(data) {
    this.setState({
      reviews: this.state.reviews.concat(data.reviews),
      total: data.total,
    });
  }

  generateURL(host, pages, keyword, rating) {
    let url = '';
    if (keyword === '' && rating === '') {
      url = `${host}?page= ${pages}`;
    } else if (keyword === '') {
      url = `${host}?page=${pages}&stars${rating}`;
    } else if (rating === '') {
      url = `${host}?page=${pages}&q=${keyword}`;
    } else {
      url = `${host}?page=${pages}&q=${keyword}&stars=${rating}`;
    }

    return url;
  }

  resetReviews(data) {
    this.setState({
      reviews: data.reviews,
      total: data.total,
    });
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
          self.setReviews(jsonData);
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
          self.resetReviews(jsonData);
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
            <ReviewList reviews={this.state.reviews} />
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
