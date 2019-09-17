import React, {Component} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {Friend} from 'the.rest/dist/to-import';
import FriendsList from './FriendsList'

export default class SearchFriend extends Component {
    async componentDidMount(){
        //let allFriends = await Friend.find().catch(console.error());
        //allFriends.delete();
        //console.log('All friends', allFriends);
        //let mom = moment().tz("America/New_York").format();
        //console.log(mom);
        //this.findAll();

    }
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    } 


    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
      }

    async onSubmit(e){
        e.preventDefault();
        let allFriends = await Friend.find({firstName: this.state.firstName}).catch(console.error());
        console.log('All friends', allFriends);
    }

    render() {
        return (
            <Form className = "searchPage" onSubmit={(e) => this.onSubmit(e)}>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName" value={this.state.name} 
                onChange={this.handleUserInput} >
                <Form.Label style = {{fontSize: 50}}>Search</Form.Label>
                <Form.Control name="firstName" placeholder="Name" />
                </Form.Group>

            </Form.Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            <FriendsList/>
            </Form>
        );
    }
}