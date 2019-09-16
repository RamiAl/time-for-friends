import React, {Component, Fragment} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {Friend} from 'the.rest/dist/to-import';

export default class FriendsList extends Component {
    state = {
        allFriends: []
    };

    componentDidMount(){
         this.findAll();
    }

    async findAll(){
        let allFriends = await Friend.find();
        console.log(allFriends);
        
        await this.setState({ "allFriends": allFriends });
    }

    render() {
        //console.log(this.state.allFriends);
        return (
            <div>
                { 
                    this.state.allFriends.map(item => item.removed ? null : 
                    (
                        <Fragment key = {item._id}>
                            <p>{item.city}</p>
                        </Fragment>
                    ))
                } 
          </div>
               
        );
        
    }
}