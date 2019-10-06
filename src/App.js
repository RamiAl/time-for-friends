import React, { Component } from 'react';
import Main from './components/Router';
import Navigation from './components/Navigation';

export default class App extends Component {
  render() {
    return (
      <>
        <Navigation />
        <Main />
      </>
    );
  }
}
