import React from "react"

export default class ReviewList extends React.Component {
  constructor() {
    super()
  }

  render() {
    // console.log("In ReviewList component - logging reviews: ");
    // console.log(this.props.reviews);

    var currentDate = new Date()
    var currentDayOfMonth = currentDate.getDate()
    var currentDayOfWeek = currentDate.getDay()
    var timeline = "Today"
    var count = 0
    var restartCount = true

    // console.log("currentDate is: ");
    // console.log(currentDate);

    const headerStyle = {
      fontWeight: 'bold',
      textAlign: 'center',
      background: '#dddddd',
      border: '1px solid black',
      padding: '10px'
    }

    const reviewList = this.props.reviews.map((review) => {

      var date = review.date.substring(0, 10)
      var time = review.date.slice(12)

      var testDate = new Date(date)
      var testDayOfMonth = testDate.getDate()+1
      var testDayOfWeek = testDate.getDay()

      if(currentDayOfMonth == testDayOfMonth+1 && restartCount){
        restartCount=false
        count = 0
        timeline = 'Yesterday'
      } else if(currentDayOfMonth > testDayOfMonth+1 && currentDayOfWeek - testDayOfWeek < 6 && !restartCount) {
        restartCount=true
        count = 0
        timeline = 'This week'
      }

      count++
      var isDisplay='show'

      if(count>1){
        isDisplay='hide'
      }

      // console.log("Test");
      // console.log("testDayOfMonth is "+testDayOfMonth);
      // console.log("currentDayOfMonth is "+currentDayOfMonth);
      // console.log("testDayOfWeek is "+testDayOfWeek);
      // console.log("currentDayOfWeek is "+currentDayOfWeek);
      // console.log("count is "+count);

        return (
          <div key={review.id}>
            <h2 className={isDisplay} style={headerStyle}>{timeline}</h2>
            <li className="list-group-item">
              <span className="bold">Author:</span> {review.author} <br></br>
              <span className="bold">Date:</span> {date} <br></br>
              <span className="bold">Time:</span> {time} <br></br>
              <span className="bold">Title:</span> {review.title} <br></br>
              <span className="bold">Review:</span> {review.review} <br></br>
              <span className="bold">Rating:</span> {review.stars}
            </li>
          </div>
        )

    })

    const divStyle = {
      marginLeft: '20px',
      marginBottom: '20px',
      marginTop: '20px',
      height: '450px',
      overflow: 'auto'
    }

    return (
      <div style={divStyle} id="componentReviewList">
        <ul className="list-group">
          {reviewList}
        </ul>
      </div>
    )
  }
}
