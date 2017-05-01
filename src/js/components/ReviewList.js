import React from "react"

export default class ReviewList extends React.Component {
  constructor() {
    super()
    this.state = {
      reviewTypeList : {}
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("in comopnentwillreceiveprops in reviewlist");
    // console.log(nextProps);
    var currentDate = new Date("04/30/2017")
    var currentMonth = currentDate.getMonth()+1
    var currentYear = currentDate.getFullYear()
    var currentDayofMonth = currentDate.getDate()
    var currentDayofWeek = currentDate.getDay()
    // console.log("current month is " + currentMonth, " current year is " + currentYear, "current day of month is " + currentDayofMonth, "current day of week is " + currentDayofWeek);
    // console.log(nextProps.reviews);
    var reviewTypeList = {}
    nextProps.reviews.forEach((review, index) => {
       var date = review.date.substring(0, 10).replace(/-/g, '\/') // dates are stupid in JS so little trick from stack overflow
       var reviewDate = new Date(date)
       var reviewMonth = reviewDate.getMonth()+1;
       var reviewYear = reviewDate.getFullYear();
       var reviewDayOfMonth = reviewDate.getDate();
       var reviewDayOfWeek = reviewDate.getDay();
      //  console.log("review month is "+reviewMonth, "review year is " + reviewYear, "review day of month is " + reviewDayOfMonth, "review day of week is " + reviewDayOfWeek);

       //TODAY
       if(currentDayofMonth == reviewDayOfMonth && currentMonth == reviewMonth && currentYear == reviewYear) {
         if(!("Today" in reviewTypeList)){
           reviewTypeList["Today"] = []
         }

         reviewTypeList["Today"].push(review)
         return
       }

       //YESTERDAY
       if(currentDayofMonth == reviewDayOfMonth+1 && currentMonth == reviewMonth && currentYear == reviewYear) {
         if(!("Yesterday" in reviewTypeList)){
           reviewTypeList["Yesterday"] = []
         }

         reviewTypeList["Yesterday"].push(review)
         return
       }

       //THIS WEEK
      //  if(currentDayofWeek != 1 && currentDayofWeek != 2 && currentMonth == reviewMonth && currentYear == reviewYear
      //  && mess) {
      //    if(!("This Week" in reviewTypeList)){
      //      reviewTypeList["This Week"] = []
      //    }
       //
      //    reviewTypeList["This Week"].push(review)
      //    return
      //  }

       //THIS MONTH
       if(currentMonth == reviewMonth && currentYear == reviewYear) {
         if(!("This Month" in reviewTypeList)){
           reviewTypeList["This Month"] = []
         }

         reviewTypeList["This Month"].push(review)
         return
       }

       //LAST MONTH
       if(currentMonth == reviewMonth+1 && currentYear == reviewYear) {
         if(!("Last Month" in reviewTypeList)){
           reviewTypeList["Last Month"] = []
         }

         reviewTypeList["Last Month"].push(review)
         return
       }

       // ALL OTHER MONTH / YEAR COMBINATIONS
       if(!(("Month "+reviewMonth + ", "+ reviewYear) in reviewTypeList)){
         reviewTypeList["Month "+reviewMonth + ", "+ reviewYear] = []
       }

       reviewTypeList["Month "+reviewMonth + ", "+ reviewYear].push(review);
      })

      this.setState({reviewTypeList});
    }

    render() {

      const headerStyle = {
        fontWeight: 'bold',
        textAlign: 'center',
        background: '#dddddd',
        border: '1px solid black',
        padding: '10px'
      }

      const divStyle = {
        marginLeft: '20px',
        marginBottom: '20px',
        marginTop: '20px',
        height: '450px',
        overflow: 'auto'
      }

      return (
        <div style={divStyle} id="reviewList">
           {Object.keys(this.state.reviewTypeList).map((key) => {
               return (
                <div key={key}>
                <h2 style={headerStyle}>{key}</h2>
                <ul className="list-group">
                    {this.state.reviewTypeList[key].map((review) => {
                        var date = review.date.substring(0, 10);
                        var time = review.date.slice(12);
                          return (
                              <li className="list-group-item" key={review.id}>
                                <span className="bold">Author:</span> {review.author} <br></br>
                                <span className="bold">Date:</span> {date} <br></br>
                                <span className="bold">Time:</span> {time} <br></br>
                                <span className="bold">Title:</span> {review.title} <br></br>
                                <span className="bold">Review:</span> {review.review} <br></br>
                                <span className="bold">Rating:</span> {review.stars}
                              </li>
                          )
                     })}
                 </ul>
                 </div>
                 )
             })
           }
        </div>
      )
    }
  }
