import React from "react"

export default function ReviewList(props) {
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
            header = key;
          }
          return (
            <div key={key}>
              <h2 style={headerStyle}>{header}</h2>
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
