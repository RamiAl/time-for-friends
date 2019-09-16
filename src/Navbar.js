import React, { Component } from "react";
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
      <li><NavLink exact activeClassName="current" to='/searchfriend'>Search For Friend</NavLink></li>
    </ul>
  </nav>
    );
  }
}

export default Navbar;