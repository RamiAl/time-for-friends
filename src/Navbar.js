import React, { Component } from "react";
//import NoMatch from './NoMatch'
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

render() {
  return (
    <nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/addfriend'>Add Friend</NavLink></li>
    </ul>
  </nav>
    );
  }
}

export default Navbar;