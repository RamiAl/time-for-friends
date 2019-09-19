import React, {Component, Fragment} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Friend} from 'the.rest/dist/to-import';
import Form from 'react-bootstrap/Form';
import Clock from './Clock'
import moment from 'moment-timezone';

export default class FriendsList extends Component {

    state = {
        allFriends: [],
    }

    componentDidMount(){        
        this.getFriendsFromDB()
    }

    componentDidUpdate(prevProps){
        if (this.props.sortBy !== prevProps.sortBy) {
            this.getFriendsFromDB()
        }
    }

    async getFriendsFromDB(){
        if(this.props.sortBy === 'timeZone'){ 
            let allFriends = await Friend.find({}, {limit: 1200});
              
            allFriends.sort((a, b) => {
            return moment.tz(a[this.props.sortBy])._offset < moment.tz(b[this.props.sortBy])._offset ? -1 : 1});
            this.setState({ "allFriends": allFriends }); 
            
        }else {
            let allFriends = await Friend.find({}, {sort: this.props.sortBy, limit: 1200});
            this.setState({ "allFriends": allFriends });   
        } 
        

    }

//.sort((a, b) => {return a[sortBy] < b[sortBy] ? -1 : 1})
//.filter(item => nameRegex.test(item[sortBy]))
    render() {
        const nameRegex = new RegExp("^" + this.props.name);
        let sortBy = this.props.sortBy;  
              
        return (
            <div >
                { 
                    this.state.allFriends.filter(item => nameRegex.test(item[sortBy])).map(item =>(
                            <Fragment key = {item._id}>
                                <div className = "friendsList">
                                    <h3>{item.firstName} {item.lastName}</h3>
                                    <Form.Row>
                                        <p><b>E-mail: </b>{item.emailAddress}  |  <b>Phone number: </b>{item.phoneNumber}  
                                        |  <b>City: </b>{item.city}  |  <b>Country: </b>{item.country}</p>
                                    </Form.Row>
                                    <Clock {...item}/>
                                </div>
                            </Fragment>
                        )
                    )
                } 
          </div>
               
        );
        
    }
}