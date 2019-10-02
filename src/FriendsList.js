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
            let allFriends = await Friend.find({}).limit(500);
              
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
            let allFriends = await Friend.find({}).sort(sortBy).limit(500);
            let filteredFriendsList = allFriends.filter(item => nameRegex.test(item[sortBy]))            
            this.setState({ allFriends: filteredFriendsList });
        } 
    }

    convertHourToMilliseconds(hour){
        var time = hour;
        var timeParts = time.split(":");
        let milliSeconds = (+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000)
        milliSeconds -= 3600000;
        return milliSeconds;
    }

    render() {
        let startTimeMilli = this.convertHourToMilliseconds(this.props.value.start);
        let endTimeMilli = this.convertHourToMilliseconds(this.props.value.end);

        let startTime = moment(startTimeMilli).format('HH:mm');
        let endTime = moment(endTimeMilli).format('HH:mm');
        return (
            <div >
                {this.state.allFriends.length === 0 ? <h3 style={{textAlign: 'center', marginTop: '20vh'}}>loading...</h3> : 
                    this.state.allFriends.filter(item => startTime <= moment.tz(item.timeZone).format('HH:mm') 
                    && moment.tz(item.timeZone).format('HH:mm') <= endTime)
                    .map(item =>(
                            <Fragment key = {item._id}>
                                <div className = "friendsList" to="/friendPage">
                                <Link to={`/friendPage/${item._id}`} className="linkStyle">
                                    <h3>{item.firstName} {item.lastName}</h3>
                                    <Form.Row>
                                        <i className="fas fa-envelope icon"></i> <p className = "infoStyle">{item.emailAddresses[0]}</p>
                                        <i className="fas fa-phone icon"></i>  <p className = "infoStyle">{item.phoneNumbers[0]}</p>
                                    </Form.Row>
                                    <Form.Row>
                                        <i className="fas fa-city icon"></i> <p className = "infoStyle">{item.city}</p>
                                        <i className="fas fa-map icon"></i> <p className = "infoStyle">{item.country}</p>
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