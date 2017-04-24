import React from "react"

import ReviewList from "./ReviewList"

export default class Layout extends React.Component {

  constructor() {
    super()
    this.state = {
      messages: [
            {
                id: "1",
                body: "Today 1",
                date: "2017-04-23T19:25:50",

            },
            {
                id: "2",
                body: "Today 2",
                date: "2017-04-23T13:20:53",

            },
            {
                id: "3",
                body: "Today 3",
                date: "2017-04-23T10:25:40",

            },
            {
                id: "4",
                body: "Today 4",
                date: "2017-04-23T05:15:32",

            },
            {
                id: "14",
                body: "Yesterday 14",
                date: "2017-04-22T09:25:50",

            },
            {
                id: "104",
                body: "Yesterday 104",
                date: "2017-04-22T09:15:50",

            },
            {
                id: "110",
                body: "Yesterday 110",
                date: "2017-04-22T09:15:50",

            },
            {
                id: "150",
                body: "Yesterday 150",
                date: "2017-04-22T09:15:50",

            },
            {
                id: "160",
                body: "This Month 160",
                date: "2017-04-10T09:15:50",

            },
            {
                id: "170",
                body: "This Month 170",
                date: "2017-04-10T08:15:50",

            },
            {
                id: "180",
                body: "This Month 180",
                date: "2017-04-05T09:15:50",

            },
            {
                id: "210",
                body: "Last Month 210",
                date: "2017-03-21T04:31:22",

            },
            {
                id: "250",
                body: "Last Month 250",
                date: "2017-03-21T03:08:31",

            },
            {
                id: "280",
                body: "Previous Month 280",
                date: "2017-02-18T01:10:32",

            },
            {
                id: "620",
                body: "Previous Month 620",
                date: "2017-02-27T04:18:40",

            },
            {
                id: "730",
                body: "Previous Month 630",
                date: "2017-02-27T04:18:40",

            },
            {
                id: "740",
                body: "Another Previous Month 740",
                date: "2017-01-27T04:18:40",

            },
            {
                id: "750",
                body: "Another Previous Month 750",
                date: "2017-01-27T04:18:40",

            },
            {
                id: "770",
                body: "Month 12 2k16 770",
                date: "2016-12-27T03:18:40",

            },
            {
                id: "790",
                body: "Month 10 2k16 790",
                date: "2016-10-27T04:18:40",

            },
            {
                id: "850",
                body: "Month 10 2k16 850",
                date: "2016-10-23T04:18:40",

            }
        ]
      }
    }

  render() {
    return (
      <div id="componentLayout">
        <ReviewList messages={this.state.messages}/>
      </div>
    )
  }
}
