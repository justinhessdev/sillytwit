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
    console.log("this is: ");
    console.log(this);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentDayofMonth = currentDate.getDate();
    const reviewTypeList = {};
    console.log(this.state);
    this.state.reviews.forEach((review) => {
      const date = review.date.substring(0, 10).replace(/-/g, '\/');
      const reviewDate = new Date(date);
      const reviewMonth = reviewDate.getMonth() + 1;
      const reviewYear = reviewDate.getFullYear();
      const reviewDayOfMonth = reviewDate.getDate();
      // const reviewDayOfWeek = reviewDate.getDay();

       // TODAY
      if (currentDayofMonth === reviewDayOfMonth &&
        currentMonth === reviewMonth &&
        currentYear === reviewYear) {
        if (!('Today' in reviewTypeList)) {
          reviewTypeList.Today = [];
        }

        reviewTypeList.Today.push(review);
        return;
      }

      // YESTERDAY
      if (currentDayofMonth === reviewDayOfMonth + 1
         && currentMonth === reviewMonth &&
         currentYear === reviewYear) {
        if (!('Yesterday' in reviewTypeList)) {
          reviewTypeList.Yesterday = [];
        }

        reviewTypeList.Yesterday.push(review);
        return;
      }

       // THIS MONTH
      if (currentMonth === reviewMonth && currentYear === reviewYear) {
        if (!('This Month' in reviewTypeList)) {
          reviewTypeList['This Month'] = [];
        }

        reviewTypeList['This Month'].push(review);
        return;
      }

       // LAST MONTH
      if (currentMonth === reviewMonth + 1 && currentYear === reviewYear) {
        if (!('Last Month' in reviewTypeList)) {
          reviewTypeList['Last Month'] = [];
        }

        reviewTypeList['Last Month'].push(review);
        return;
      }

       // ALL OTHER MONTH / YEAR COMBINATIONS
      if (!((`Month ${reviewMonth}, ${reviewYear}`) in reviewTypeList)) {
        reviewTypeList[`Month ${reviewMonth}, ${reviewYear}`] = [];
      }

      reviewTypeList[`Month ${reviewMonth}, ${reviewYear}`].push(review);
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
