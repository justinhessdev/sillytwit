import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class Navigate extends Component {
  render() {
    return (
        <Container contains={'who knows'}>
          <Home location={'El Salvador'} />
          <Address />
          <NotFound />
        </Container>
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
const NotFound = () => <h1>404.. This page is not found -- JK it is!</h1>;

/*
Using clone element now all children of Container --- Home, Address, and NotFound
Receive props hmmmm = "who knows" 
*/
const Container = (props) => (
  <div>
    {
      React.Children.map(props.children, (child, i) =>
        React.cloneElement(child, {
          hmmmmm: props.contains
        })
      )
    }
  </div>
);

export default Navigate;
