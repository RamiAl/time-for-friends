import React, { Component } from "react";
import AddFriend from './AddFriend'
import SearchFriend from './SearchFriend'
import Home from './Home'
import Maps from './Maps'
import FriendPage from './FriendPage'
import NoMatch from './NoMatch'
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
class Main extends Component {
    render() {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/addfriend' component={AddFriend}></Route>
            <Route path='/friendPage/:id' component={FriendPage}></Route>
            <Route path='/searchfriend' component={SearchFriend}></Route>
            <Route path='/maps/:id' component={Maps}></Route>
            <Route component={NoMatch}></Route>
        </Switch>
        );
    }
}

export default Main;