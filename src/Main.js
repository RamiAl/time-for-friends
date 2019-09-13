import React, { Component } from "react";
import AddFriend from './AddFriend'
import Home from './Home'
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
            <Route component={NoMatch}></Route>
        </Switch>
        );
    }
}

export default Main;