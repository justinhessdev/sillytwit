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
        .sort(function(a, b) {
          if (b.split('/').map(Number)[1] === a.split('/').map(Number)[1]) {
            return b.split('/').map(Number)[0] - a.split('/').map(Number)[0]
          }
          return b.split('/').map(Number)[1] - a.split('/').map(Number)[1]
        })
        .map((key) => {
          return (
            <div key={key}>
              <h2 style={headerStyle}>{key}</h2>
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
