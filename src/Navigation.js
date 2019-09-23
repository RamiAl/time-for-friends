import React, { Component } from "react";
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Clock from "./Clock";
import { NavLink } from 'react-router-dom';
class Navigation extends Component {

  //<NavLink className="nav-placment" to='/'>Home</NavLink>

render() {
  return (
<Navbar bg="light" expand="lg">
  <Navbar.Brand >Time for friends</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavLink className="nav-placment" to='/addfriend'>Add Friend</NavLink>
      <NavLink className="nav-placment" to='/searchfriend'>Search For Friend</NavLink>
      <NavLink className="nav-placment disabled" to=''><i className="fas fa-sun"></i></NavLink>
      <NavLink className="nav-placment disabled" to=''><Clock/></NavLink>
      
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
  }
}

export default Navigation;