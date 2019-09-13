import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Friend } from 'the.rest/dist/to-import'
import Navbar from './Navbar'

class App extends Component{

  async componentDidMount(){
    /*let friend = new Friend ({name: 'Rami', age: 23, emailAddress: 'Rami.almhana@yahoo.com',
                              phoneNumber: '0700455645', city: 'Malmö',
                              country: 'Sverige', timeZone: 'UTM -01:00'});
    await friend.save();
    console.log('friend', friend);

    let allFriends = await Friend.find().catch(console.error());
    //allElephants.delete();
    console.log('All friends', allFriends);*/
  }
  render(){
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;
