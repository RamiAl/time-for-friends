import React, { Component } from "react";
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//import Button from 'react-bootstrap/Button';
import Clock from "./Clock";
import { NavLink } from 'react-router-dom';
import store from './utilities/Store';
class Navigation extends Component {
  constructor(props){
    super(props)
    this.state = {lang: store.lang};
}
componentDidMount(){
  this.storeListener = ()=>{
    this.setState({lang: store.lang});   
};
store.subscribeToChanges(this.storeListener);
}

switchlang() {
  console.log('hej');
  store.setState({
    lang: true
  });      
}


render() {
  
  
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand >Time for friends</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="nav-placment navLinkStyle" to='/'>Home</NavLink>
          <NavLink className="nav-placment navLinkStyle" to='/addfriend'>Add Friend</NavLink>
          <NavLink className="nav-placment navLinkStyle" to='/searchfriend'>Search For Friend</NavLink>
          <NavLink className="nav-placment disabled" to=''><Clock/></NavLink>
          <button onClick={() => this.switchlang()}>{store.lang ? 'Switch to Sv' : 'Bytt till Eng'}</button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

export default Navigation;