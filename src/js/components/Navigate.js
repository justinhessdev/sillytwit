import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class Navigate extends Component {
  render() {
    return (
      <div>
        <Container>
          <Home />
          <Address />
          <NotFound />
        </Container>
      </div>
      // <Router history={hashHistory}>
      //   <Route path='/' component={Container}>
      //     <IndexRoute component={Home} />
      //     <Route path='/address' component={Address} />
      //     <Route path='*' component={NotFound} />
      //   </Route>
      // </Router>
    );
  }
}

const Home = () => <h1>Hello from Home!</h1>;
const Address = () => <h1>We are located at Somewhere Over The Rainbow</h1>;
const NotFound = () => <h1>404.. This page is not found!</h1>;

const Container = (props) => (
  <div>
    {
      React.Children.map(props.children, (child, i) => {
        if (i > 2) return
        return child;
      })
    }
  </div>
);

export default Navigate;
