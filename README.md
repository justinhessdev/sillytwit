# Sillytwit
## Filter through silly twitter reviews

## Instructions:

1. Clone the Repo: [https://github.com/justinhessdev/sillytwit](https://github.com/justinhessdev/sillytwit "Sillytwit")

2. Install Dependencies: 

		npm install
		
3. Add .env file to root of project directory
		
		Ask nicely and I'll give you the secret URL to make the app work -- App will not run without these env variables

4. Locate project in terminal and run:
		
		npm run dev
		
Now Sillytwit is up and running live on **localhost:8080**

Check it out!		
	
________________________

**Note**

The command 
	
	npm run dev
	
works with live reload by webpack dev server on **localhost:8080** because:	

##### In package.json we add the following script: 

	"dev": "webpack-dev-server --content-base src --inline --hot"
	



## Walkthrough

###### Screenshot
![Alt text](./src/img/sillytwit.png?raw=true "Sillytwit Screenshot")
	
###### Layout.js:

Layout -- class component -- contains all state in our app:

	export default class Layout extends React.Component {
	
	  constructor(props) {
	    super(props);
	    this.state = {
	      reviews: [],
	      reviewTypeList: {},
	      total: 0,
	      pages: 1,
	      url: process.env.REACT_APP_APPFIGURES_URL,
	      keyword: '',
	      rating: '',
	    };
	  }
	  ...
	  ...
	}
	
Once the component is mounted we call our private url to generate a list of twitter reviews:

	  componentDidMount() {
	    const self = this;
	    function loadMyReviews(data) {
	      data.json()
	        .then((jsonData) => {
	          console.log(jsonData.reviews);
	          self.setState({
	            reviews: self.state.reviews.concat(jsonData.reviews),
	            total: jsonData.total,
	          });
	
	          self.sectionReviews();
	        });
	    }
	
	    fetch(this.state.url, { credentials: 'same-origin' }).then(loadMyReviews);
	  }

First, I `fetch` the reviews --- I receive a JSON like this from the Appfigures API:

	{
		total: 571125,
		pages: 22845,
		this_page: 1,
		reviews: [
			{
				author: "それさっき言ったやん？",
				title: "愛用。",
				review: "えぇやん",
				original_title: "愛用。",
				original_review: "えぇやん",
				stars: "5.00",
				date: "2017-05-24T06:09:53",
				id: "5980590LCJGrqghwuWjMPimiqs0g4A",
			},
			{
				author: "Vipinanand12345",
				title: "Good",
				review: "Good",
				original_title: "Good",
				original_review: "Good",
				stars: "5.00",
				date: "2017-05-24T06:07:47",
				id: "5980590LNM77PFeJnSBsIMrDCdgXUw",
			}
			...
			...
			...
		]
	}
	
Then I set the state of my reviews with this object:

      self.setState({
        reviews: self.state.reviews.concat(jsonData.reviews),
        total: jsonData.total,
      });
      
As you can see I also keep track of the total number of reviews received frmo the API.

Then finally, I call `sectionReviews()`: The goal is to group these reviews in sections -- 

	Today, Yesterday, This Week, Last Week, This Month, Last Month, Previous Month/Year

`sectionReviews():`

	  sectionReviews() {
	    const currentDate = new Date();
	    currentDate.setHours(0, 0, 0, 0); // set to midnight
	    // Prepare manual dates: today, yesterday, this week, last week...
	    const keys = [];
	    const reviewTypeList = {};
	    // keys is an array of (size 2) arrays
	    keys.push(['Today/10006', new Date(currentDate)]);
	    currentDate.setDate(currentDate.getDate() - 1);
	    keys.push(['Yesterday/10005', new Date(currentDate)]);
	    currentDate.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));
	    keys.push(['This Week/10004', new Date(currentDate)]);
	    currentDate.setDate(currentDate.getDate() - 7);
	    keys.push(['Last Week/10003', new Date(currentDate)]);
	    currentDate.setDate(1);
	    keys.push(['This Month/10002', new Date(currentDate)]);
	    currentDate.setMonth(currentDate.getMonth() - 1);
	    keys.push(['Last Month/10001', new Date(currentDate)]);
	    this.state.reviews.forEach((review) => {
	      const date = review.date.substring(0, 10).replace(/-/g, '\/');
	      const reviewDate = new Date(date);
	      const [key, keyDate] = keys.find(([header, headerDate]) => reviewDate >= headerDate) || [];
	      const dynamicKey = `${reviewDate.getMonth()}/${reviewDate.getFullYear()}`;
	
	      if (key) { // if key is not null we are using our manually made keys
	        if (!(key in reviewTypeList)) {
	          reviewTypeList[key] = [];
	        }
	        reviewTypeList[key].push(review);
	      } else { // if keys is null we are using our dynamicKeys
	        if (!(dynamicKey in reviewTypeList)) {
	          reviewTypeList[dynamicKey] = [];
	        }
	        reviewTypeList[dynamicKey].push(review);
	      }
	    });
	
	    this.setState({ reviewTypeList });
	  }
	  
Notice how at the end we set the state for `reviewTypeList`. `reviewTypeList` contains the key value pairs of our grouped reviews. The key is the Date -- Today, Yesterday, This Week... and the value contains all the reviews received on that day.

Now that the state is set for `reviewTypeList` we can display them thanks to our render method:

	  render() {
	    return (Object.keys(this.state.reviewTypeList).length) ? (
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
	            <ReviewList reviewTypeList={this.state.reviewTypeList} />
	          </div>
	        </div>
	        <div className="row">
	          <div className="col-xs-10">
	            <LoadMore handleLoadMore={this.handleLoadMore} />
	          </div>
	        </div>
	      </div>
	    ) : <LoadingSpinner />;
	  }
	}
	  
Let's focus on this line:

	<ReviewList reviewTypeList={this.state.reviewTypeList} />
	
We send props to ReviewList -- a functional component -- which contains the grouped reviews.

`ReviewList.js`:

	export default function ReviewList(props) {
	  ReviewList.propTypes = {
	    reviewTypeList: PropReviewTypeList.isRequired,
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
	
So then all I do is sort the keys then map through each key and display the relevant information.


# Notes:
	  
The app, as shown above, is comprised of **React** components:

	1. Keyword Component 
	2. Rating Component
	3. ReviewList Component
	4. Total Component
	5. LoadMore Component -- for pagination - load more pages
	6. Loading Component - for loading state
	7. Layout Component

-- Layout Component renders all components

In my **client.js** I render my Layout component to the DOM:
	
	const app = document.getElementById('app')
	ReactDOM.render(<Layout/>, app)
	
and **app** is the main element located in **index.html** where all the **React** magic happens:

	<div id="app"></div>
	
		  
#### I use some ES6 techniques: 

	const [key, keyDate] = keys.find(([header, headerDate]) => reviewDate >= headerDate) || [];
	
keys.find() returns an array of size 2 if it finds a match. If so, the first element is key and the second is keyDate...

