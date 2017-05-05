import React from "react"

export default class ReviewList extends React.Component {
  constructor() {
    super();
    this.state = {
      reviewTypeList: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log("in comopnentwillreceiveprops in reviewlist");
    // console.log(nextProps);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentDayofMonth = currentDate.getDate();
    const reviewTypeList = {};
    nextProps.reviews.forEach((review) => {
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

      // THIS WEEK
      //  if(currentDayofWeek != 1 && currentDayofWeek != 2
      // && currentMonth == reviewMonth && currentYear == reviewYear
      //  && mess) {
      //    if(!("This Week" in reviewTypeList)){
      //      reviewTypeList["This Week"] = []
      //    }
      //
      //    reviewTypeList["This Week"].push(review)
      //    return
      //  }

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

  render() {
    const headerStyle = {
      fontWeight: 'bold',
      textAlign: 'center',
      background: '#dddddd',
      border: '1px solid black',
      padding: '10px',
    };

    const divStyle = {
      marginLeft: '20px',
      marginBottom: '20px',
      marginTop: '20px',
      height: '450px',
      overflow: 'auto',
    };

    return (
      <div style={divStyle} id="reviewList">
        {Object.keys(this.state.reviewTypeList).map((key) => {
          return (
            <div key={key}>
              <h2 style={headerStyle}>{key}</h2>
              <ul className="list-group">
                {this.state.reviewTypeList[key].map((review) => {
                  const date = review.date.substring(0, 10);
                  const time = review.date.slice(12);
                  return (
                    <li className="list-group-item" key={review.id}>
                      <span className="bold">Author:</span> {review.author} <br></br>
                      <span className="bold">Date:</span> {date} <br></br>
                      <span className="bold">Time:</span> {time} <br></br>
                      <span className="bold">Title:</span> {review.title} <br></br>
                      <span className="bold">Review:</span> {review.review} <br></br>
                      <span className="bold">Rating:</span> {review.stars} <br></br>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
      }
      </div>
    );
  }
}
