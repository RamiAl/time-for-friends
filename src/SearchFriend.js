import React, {Component} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import FriendsList from './FriendsList'
import TimeRangeSlider from 'react-time-range-slider';
import ScrollTop from "react-scrolltop-button";
import MyIcon from "react-scrolltop-button";
import store from './utilities/Store';
export default class SearchFriend extends Component {
    async componentDidMount(){
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
        store.subscribeToChanges(this.storeSubscriber);
    } 
    
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    
    timeChangeHandler(time){
        this.setState({
            value: time
        });
    }

    render() {
        return (
            <>
                <ScrollTop
                text="To the top"
                distance={100}
                breakpoint={768}
                className="scroll-your-role scrollTop"
                speed={1000}
                icon={<MyIcon />}
                />
                <Form className="searchPage">
                <div className="container-fluid ">
                    <div className="row ">

                        <Form.Group className="col-md-8" controlId="formGridName" value={this.state.name} 
                        onChange={this.handleUserInput} >
                        <Form.Label style = {{fontSize: 50}} >{store.lang ?'Search':'Sök'}</Form.Label>
                        <Form.Control name="name" placeholder="Name" />
                        </Form.Group>

                        <Form.Group className="col-md-4 sortBy" controlId="formGridState" value={this.state.timeZone} 
                        onChange={this.handleUserInput} >
                        <Form.Label >{store.lang ?'Sort by':'Sortera via'}</Form.Label>
                        <Form.Control as="select" name="sortBy" placeholder="Country">
                        <option value = "firstName">{store.lang ?'First name':'Förnamn'}</option>
                        <option value = "lastName">{store.lang ?'Last name':'Efternamn'}</option>
                        <option value = "timeZone">{store.lang ?'Time zon':'Tidszone'}</option>
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
                    value={this.state.value}/>
                        
                    <div className = "timeRange">
                        <h6>{store.lang ?'start: ':'start: '} {this.state.value.start}</h6>
                        <h6>{store.lang ?'end: ':'slut: '} {this.state.value.end}</h6>
                    </div>

                    <FriendsList {...this.state}/>
                </Form>
            </>
        );
    }
}