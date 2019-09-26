import React, {Component} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {Friend} from 'the.rest/dist/to-import';
import moment from 'moment-timezone';
const allTimeZone =  moment.tz.names();
export default class AddFriend extends Component {

    async componentDidMount(){
    }
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailAddress: '',
            city: '',
            country: '',
            timeZone: ''
          };
        this.handleUserInput = this.handleUserInput.bind(this);
    } 

    async handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
       await this.setState({[name]: value});
    }           

check(){
    console.log(this.state.city);
    function filterItems(allTimeZone, city) {
        return allTimeZone.filter(function(el) {
            return el.toLowerCase().indexOf(city.toLowerCase()) !== -1;
        })
      }
    filterItems(allTimeZone, this.state.city).map(x => console.log(x));
}


showTimeZoneList(){
let c = allTimeZone.filter( item => this.state.city !== "" && item.toLowerCase().includes(this.state.city.toLowerCase()));
if(c.length > 0){
    if(c.map(item =>(<option key = {item}>{item}</option>).length > 0)){
        setTimeout(()=>{
            const v = this.refs.timeZone.value;
            if (this.state.timeZone !== v) {
                this.setState({timeZone: v})
            }
        }, 0);        
        return c.map(item =>(<option key = {item}>{item}</option>));
    }
}else{
    return allTimeZone.map(item =>(
        <option key = {item}>{item}</option>
    ));
}
   
}
    async onSubmit(e){
        e.preventDefault();
        console.log(this.state);
        
        let friend = new Friend (this.state);
        await friend.save();
        
        let allFriends = await Friend.find().catch(console.error());
        console.log('All friends', allFriends);

        this.refs.form.reset();
    }

    render() {
        console.log(this.state.city);
        return (
            <>
            <Form style = {{margin: 50}} onSubmit={(e) => this.onSubmit(e)} ref="form">
            <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName" value={this.state.name} 
                onChange={this.handleUserInput} >
                <Form.Label >First name</Form.Label>
                <Form.Control  name="firstName" placeholder="Enter name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName" value={this.state.lastName} 
                onChange={this.handleUserInput}>
                <Form.Label>Last name</Form.Label>
                <Form.Control name="lastName" placeholder="Last name" />
                </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col} controlId="formGridPhoneNumber" value={this.state.phoneNumber} 
                onChange={this.handleUserInput}>
                <Form.Label>Phone number</Form.Label>
                <Form.Control name="phoneNumber" placeholder="Phone number" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail" value={this.state.emailAddress} 
                onChange={this.handleUserInput}>
                <Form.Label>Email address</Form.Label>
                <Form.Control name="emailAddress" placeholder="Email address" />
            </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity" value={this.state.city} 
                onChange={this.handleUserInput}>
                <Form.Label>City</Form.Label>
                <Form.Control name="city" placeholder="City" ref ="city"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCountry" value={this.state.country} 
                onChange={this.handleUserInput}>
                <Form.Label>Country</Form.Label>
                <Form.Control name="country" placeholder="Country" ref ="country"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTimeZone" value={this.state.timeZone} 
                onChange={this.handleUserInput} >
                <Form.Label>Time zone</Form.Label>
                <Form.Control as="select" name="timeZone" ref ="timeZone">
                    {this.showTimeZoneList()}
                </Form.Control >
                </Form.Group>


            </Form.Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            
            </Form>
            
            </>
        );
    }
}