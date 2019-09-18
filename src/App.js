import React, { Component } from 'react';
//import Navbar from './Navbar';
import Main from './Main';
import Navigation from './Navigation';
//<Navbar />

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
