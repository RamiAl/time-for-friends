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
        this.state = {};
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
                <Form.Control name="firstName" placeholder="Name" />
                </Form.Group>

            </Form.Row>
            <FriendsList {...this.state}/>
            </Form>
        );
    }
}