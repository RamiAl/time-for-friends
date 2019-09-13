import React, { Component } from "react";
import AddFriend from './AddFriend'
import Home from './Home'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Navbar extends Component {

render() {
  return (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/addFriend">Add friend</Link>
        </li>
      </ul>
      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/addFriend" component={AddFriend} />
    </div>
  </Router>
    );
  }
}

export default Navbar;