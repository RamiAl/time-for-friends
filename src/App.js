import React, { Component } from 'react';
import Main from './Main';
import Navigation from './Navigation';

export default class App extends Component{
  render(){
    return (
      <>
        <Navigation />
        <Main />
      </>
    );
  }
}
