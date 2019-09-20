import React, {Component, Fragment} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Friend} from 'the.rest/dist/to-import';
import Form from 'react-bootstrap/Form';
import Clock from './Clock'
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';


export default class FriendsList extends Component {

    state = {
        allFriends: [],
    }

    componentDidMount(){        
        this.getFriends()
    }

    componentDidUpdate(prevProps){
        if (this.props.sortBy !== prevProps.sortBy) {
            this.getFriends()
        }
        if (this.props.name !== prevProps.name) {
            this.getFriends()
        }
        if (this.props.value !== prevProps.value) {
            this.getFriends()
        }
    }

    async getFriends(){
        const nameRegex = new RegExp("^" + this.props.name);
        let sortBy = this.props.sortBy;        

        if(sortBy === 'timeZone'){ 
            let allFriends = await Friend.find({}, {limit: 10});
              
            allFriends.sort((a, b) => {
                let offSet1 = moment.tz(a[sortBy])._offset;
                let offSet2 = moment.tz(b[sortBy])._offset;

                if (offSet1 === offSet2){
                    return a.firstName < b.firstName? -1 : 1
                }else {
                    return offSet1 < offSet2 ? -1 : 1
                }
            })
            
            this.setState({ "allFriends": allFriends });             
        }else {
            let allFriends = await Friend.find({}, {sort: sortBy, limit: 10});
            let filteredFriendsList = allFriends.filter(item => nameRegex.test(item[sortBy]))
            this.setState({ "allFriends": filteredFriendsList });
        } 
    }

//.sort((a, b) => {return a[sortBy] < b[sortBy] ? -1 : 1})
//.filter(item => nameRegex.test(item[sortBy]))
    render() {
        let startTime = this.props.value.start;
        let endTime = this.props.value.end;
        //this.state.allFriends.map(item => console.log('startTime: ',startTime, ', theTime: ',moment.tz(item.timeZone).format('HH:mm'), ', endTime: ', endTime))
        
        return (
            <div >
                {
                    this.state.allFriends.filter(item => startTime < moment.tz(item.timeZone).format('HH:mm') 
                    && moment.tz(item.timeZone).format('HH:mm') < endTime)
                    .map(item =>(
                            <Fragment key = {item._id}>
                                
                                <div className = "friendsList" to="/friendPage">
                                <Link to={`/friendPage/${item._id}`} className="linkStyle">
                                    <h3>{item.firstName} {item.lastName}</h3>
                                    <Form.Row>
                                        <p><b>E-mail: </b>{item.emailAddress}  |  <b>Phone number: </b>{item.phoneNumber}  
                                        |  <b>City: </b>{item.city}  |  <b>Country: </b>{item.country}</p>
                                    </Form.Row>
                                    <Clock {...item}/>
                                    </Link>

                                </div>
                            </Fragment>
                        )
                    )
                } 
          </div>
               
        );
        
    }
}