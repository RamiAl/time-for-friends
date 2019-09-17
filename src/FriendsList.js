import React, {Component, Fragment} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Friend} from 'the.rest/dist/to-import';
import Form from 'react-bootstrap/Form';
import Clock from './Clock'

export default class FriendsList extends Component {
    state = {
        allFriends: []
    }

    componentDidMount(){        
        this.findAll();
    }

    async findAll(){
        let allFriends = await Friend.find();  
        this.setState({ "allFriends": allFriends });         
    }

    render() {
        const emailRegex = new RegExp("^" + this.props.firstName);
        return (
            <div >
                { 
                    this.state.allFriends.filter(item => emailRegex.test(item.firstName)).map(item =>
                    (
                        <Fragment key = {item._id}>
                            <div className = "friendsList">
                                <h3>{item.firstName} {item.lastName}</h3>
                                <Form.Row>
                                    <p><b>E-mail: </b>{item.emailAddress}  |  <b>Phone number: </b>{item.phoneNumber}  
                                    |  <b>City: </b>{item.city}  |  <b>Country: </b>{item.country}</p>
                                    <div>
                                    <Clock {...item}>
                                        
                                    </Clock></div>
                                </Form.Row>
                            </div>
                        </Fragment>
                    ))
                } 
          </div>
               
        );
        
    }
}