import React, {Component} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import FriendsList from './FriendsList'

export default class SearchFriend extends Component {
    async componentDidMount(){
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sortBy: 'firstName'
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    } 


    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
        
    }

    render() {
        return (
            <Form className = "searchPage">
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName" value={this.state.name} 
                onChange={this.handleUserInput} >
                <Form.Label style = {{fontSize: 50}}>Search</Form.Label>
                <Form.Control name="name" placeholder="Name" />
                </Form.Group>

                <Form.Group className = "m-5" as={Col} controlId="formGridState" value={this.state.timeZone} 
                onChange={this.handleUserInput} >
                <Form.Label>Sort by</Form.Label>
                <Form.Control as="select" name="sortBy" placeholder="Country">
                <option value = "firstName">First name</option>
                <option value = "lastName">Last name</option>
                <option value = "timeZone">Time zone</option>
                </Form.Control >
                </Form.Group>

            </Form.Row>
            <FriendsList {...this.state}/>
            </Form>
        );
    }
}