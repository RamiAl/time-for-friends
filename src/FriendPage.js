import React, { Component } from "react";
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Friend} from 'the.rest/dist/to-import';
import Clock from './Clock'

export default class FriendPage extends Component {
    state = {
        friend: {}
    }
    
    componentDidMount(){
        this.getTheFriend();
    }

    async getTheFriend(){
        let friend = await Friend.find({_id: this.props.match.params.id})
        this.setState ({'friend': friend})
        console.log(this.state.friend);
    }
    
    render() {
        let friend = this.state.friend;
        
        console.log(friend);
        
        return (
            <>
                <h3>{friend.firstName} {friend.lastName}</h3>
                <p><b>E-mail: </b>{friend.emailAddress}  |  <b>Phone number: </b>{friend.phoneNumber}  
                |  <b>City: </b>{friend.city}  |  <b>Country: </b>{friend.country}</p>
                <Clock {...this.state}/>
            </>
            );
    }
}

