import React, { PropTypes } from 'react';

export default function ReviewList(props) {
  ReviewList.propTypes = {
    reviewTypeList: PropTypes.shape({
      'Today/10006': PropTypes.arrayOf(PropTypes.object),
      'Yesterday/10005': PropTypes.arrayOf(PropTypes.object),
      'This Week/10004': PropTypes.arrayOf(PropTypes.object),
      'Last Week/10003': PropTypes.arrayOf(PropTypes.object),
      'This Month/10002': PropTypes.arrayOf(PropTypes.object),
      'Last Month/10001': PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  };

  return (
    <div id="componentReviewList">
      {Object.keys(props.reviewTypeList)
        .sort((a, b) => {
          const yearA = a.split('/').map(Number)[1];
          const yearB = b.split('/').map(Number)[1];
          const monthA = a.split('/').map(Number)[0];
          const monthB = b.split('/').map(Number)[0];
          if (yearB === yearA) {
            return monthB - monthA;
          }
          return yearB - yearA;
        })
        .map((key) => {
          let header;

          if (key === 'Today/10006' || key === 'Yesterday/10005' || key === 'This Week/10004'
        || key === 'Last Week/10003' || key === 'This Month/10002' || key === 'Last Month/10001') {
            header = key.split('/')[0];
          } else {
            const monthObj = {
              0: 'Jan',
              1: 'Feb',
              2: 'Mar',
              3: 'Apr',
              4: 'May',
              5: 'June',
              6: 'July',
              7: 'Aug',
              8: 'Sep',
              9: 'Oct',
              10: 'Nov',
              11: 'Dec',
            };
            const month = key.split('/')[0];
            const year = key.split('/')[1];
            header = `${monthObj[month]}${year}`;
          }
          return (
            <div key={key}>
              <h2 id="headerReviewList">{header}</h2>
              <ul className="list-group">
                {props.reviewTypeList[key].map((review) => {
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
