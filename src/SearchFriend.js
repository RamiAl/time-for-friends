import React, { Component } from 'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import FriendsList from './FriendsList'
import TimeRangeSlider from 'react-time-range-slider';
import ScrollTop from "react-scrolltop-button";

export default class SearchFriend extends Component {
    async componentDidMount() {
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sortBy: 'firstName',
            value: {
                start: "00:00",
                end: "23:59"
            }
        };
        this.timeChangeHandler = this.timeChangeHandler.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    timeChangeHandler(time) {
        this.setState({
            value: time
        });
    }

    render() {
        return (
            <>
                <ScrollTop
                    text="Go to the top"
                    distance={100}
                    breakpoint={768}
                    className="scroll-your-role scrollTop"
                    speed={1000}
                />
                <Form className="searchPage">
                    <div className="container-fluid ">
                        <div className="row ">

                            <Form.Group className="col-md-8" controlId="formGridName" value={this.state.name}
                                onChange={this.handleUserInput} >
                                <Form.Label style={{ fontSize: 50 }} >Search</Form.Label>
                                <Form.Control name="name" placeholder="Name" />
                            </Form.Group>

                            <Form.Group className="col-md-4 sortBy" controlId="formGridState" value={this.state.timeZone}
                                onChange={this.handleUserInput} >
                                <Form.Label >Sort by</Form.Label>
                                <Form.Control as="select" name="sortBy" placeholder="Country">
                                    <option value="firstName">First name</option>
                                    <option value="lastName">Last name</option>
                                    <option value="timeZone">Time zone</option>
                                </Form.Control >
                            </Form.Group>
                        </div>
                    </div>
                    <TimeRangeSlider
                        format={24}
                        maxValue={"23:59"}
                        minValue={"00:00"}
                        name={"time_range"}
                        onChange={this.timeChangeHandler}
                        step={15}
                        value={this.state.value} />

                    <div className="timeRange">
                        <h6>Start: {this.state.value.start}</h6>
                        <h6>End: {this.state.value.end}</h6>
                    </div>

                    <FriendsList {...this.state} />
                </Form>
            </>
        );
    }
}