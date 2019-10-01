import React, { Component } from "react";
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Friend} from 'the.rest/dist/to-import';
import Clock from './Clock'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import store from './utilities/Store';
export default class FriendPage extends Component {
    state = {
        friend: {}
    }
    
    componentDidMount(){
        this.getTheFriend();
        store.subscribeToChanges(this.storeSubscriber);
    }

    async getTheFriend(){
        let friend = await Friend.findOne({_id: this.props.match.params.id})
        Object.assign(friend, {clock: true})
        this.setState ({'friend': friend})
    }
    
    render() {
        let friend = this.state.friend;
        return (
            <>
                <Link to={`/searchfriend`} className="linkStyle">
                <button type="button" className="btn btn-secondary backButton"><i class="fas fa-arrow-left"></i> {store.lang ? 'Back':'Tillbacka'}</button>
                </Link>
                <div className="container-fluid friendItem">
                    <div className="row ">
                        <div className = "col-md-6">
                            <h3>{friend.firstName} {friend.lastName}</h3>
                            <Form.Row>
                                <i className="fas fa-envelope icon"></i> <p className = "infoStyle">{friend.emailAddress}</p>
                            </Form.Row>
                            <Form.Row>
                                <i className="fas fa-phone icon"></i>  <p className = "infoStyle">{friend.phoneNumber}</p>
                            </Form.Row>
                            <Form.Row>
                                <i className="fas fa-city icon"></i> <p className = "infoStyle">{friend.city}</p>
                            </Form.Row>
                            <Form.Row>
                                <i className="fas fa-map icon"></i> <p className = "infoStyle">{friend.country}</p>
                            </Form.Row>
                            <Clock {...friend}/>
                        </div>
                        <div className = "viewOnMap  col-md-6">
                            <Link to={`/maps/${this.props.match.params.id}`} className="linkStyle">
                                 <button type="button" className="btn btn-secondary viewOnMapButton">{store.lang ? 'View on map' :'Vissa på kartan'}</button> 
                            </Link>
                        </div>
                    </div>
            </div>
            
            </>
            );
    }
}



