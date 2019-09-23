import React, { Component } from 'react';
import Main from './Main';
import Navigation from './Navigation';

class App extends Component{
 

  async componentDidMount(){
    
  }
  render(){
    return (
      <div>
        <Navigation />
        <Main />
      </div>
    );
    
  }
}


export default App;
