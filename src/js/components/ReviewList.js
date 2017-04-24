import React from "react"

export default class ReviewList extends React.Component {
  constructor() {
    super()
    this.state = {
      mssgTypeList : {}
    }
  }

  componentDidMount(){
    var currentDate = new Date()
    var currentMonth = currentDate.getMonth()+1
    var currentYear = currentDate.getFullYear()
    var currentDayofMonth = currentDate.getDate()
    var currentDayofWeek = currentDate.getDay()
    console.log("current month is " + currentMonth, " current year is " + currentYear, "current day of month is " + currentDayofMonth, "current day of week is " + currentDayofWeek);
    var mssgTypeList = {}
    this.props.messages.forEach((message, index) => {
       var date = message.date.substring(0, 10).replace(/-/g, '\/') // dates are stupid in JS so little trick from stack overflow
       var messageDate = new Date(date)
       var messageMonth = messageDate.getMonth()+1;
       var messageYear = messageDate.getFullYear();
       var messageDayOfMonth = messageDate.getDate();
       var messageDayOfWeek = messageDate.getDay();
       console.log("message month is "+messageMonth, "message year is " + messageYear, "message day of month is " + messageDayOfMonth, "message day of week is " + messageDayOfWeek);

       //TODAY
       if(currentDayofMonth == messageDayOfMonth && currentMonth == messageMonth && currentYear == messageYear) {
         if(!("Today" in mssgTypeList)){
           mssgTypeList["Today"] = []
         }

         mssgTypeList["Today"].push(message)
         return
       }

       //YESTERDAY
       if(currentDayofMonth == messageDayOfMonth+1 && currentMonth == messageMonth && currentYear == messageYear) {
         if(!("Yesterday" in mssgTypeList)){
           mssgTypeList["Yesterday"] = []
         }

         mssgTypeList["Yesterday"].push(message)
         return
       }

       //THIS WEEK
      //  if(currentDayofWeek != 1 && currentDayofWeek != 2 && currentMonth == messageMonth && currentYear == messageYear 
      //  && mess) {
      //    if(!("This Week" in mssgTypeList)){
      //      mssgTypeList["This Week"] = []
      //    }
       //
      //    mssgTypeList["This Week"].push(message)
      //    return
      //  }

       //THIS MONTH
       if(currentMonth == messageMonth && currentYear == messageYear) {
         if(!("This Month" in mssgTypeList)){
           mssgTypeList["This Month"] = []
         }

         mssgTypeList["This Month"].push(message)
         return
       }

       //LAST MONTH
       if(currentMonth == messageMonth+1 && currentYear == messageYear) {
         if(!("Last Month" in mssgTypeList)){
           mssgTypeList["Last Month"] = []
         }

         mssgTypeList["Last Month"].push(message)
         return
       }

       // ALL OTHER MONTH / YEAR COMBINATIONS
       if(!(("Month "+messageMonth + ", "+ messageYear) in mssgTypeList)){
         mssgTypeList["Month "+messageMonth + ", "+ messageYear] = []
       }

       mssgTypeList["Month "+messageMonth + ", "+ messageYear].push(message);
      })

      this.setState({mssgTypeList});
    }

    render() {
      return (
        <div id="messageList">
           {Object.keys(this.state.mssgTypeList).map((key) => {
               return (
                <div key={key}>
                <h2>{key}</h2>
                <ul className="list-group">
                    {this.state.mssgTypeList[key].map((message) => {
                        var date = message.date.substring(0, 10);
                        var time = message.date.slice(12);

                          return (
                              <li className="list-group-item" key={message.id}>
                                Date: {date} <br></br>
                                Time: {time} <br></br>
                                Body: {message.body}
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
