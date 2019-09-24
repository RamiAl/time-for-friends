import React, {Component} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {Friend} from 'the.rest/dist/to-import';
import moment from 'moment-timezone';
//import { all } from 'q';
//import { arrowFunctionExpression } from '@babel/types';
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
            timeZone: 'Africa/Abidjan'
          };
        this.handleUserInput = this.handleUserInput.bind(this);
        //this.myFunction = this.myFunction.bind(this);
    } 

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
        this.check(); 
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


showlist(){
    //let a = 0; 
    /*ska börga mend land kan man bortse
    sedan stad om den fins 
    sist inget*/
    console.log(this.state.country);
    console.log(this.timeZone);

    if (allTimeZone === undefined || allTimeZone.length === 0) {
        // array empty or does not exist
    }


    


if (this.state.city  !== '') {
    console.log('1');
 
    if(allTimeZone.filter( item => item.toLocaleLowerCase().indexOf(this.state.city.toLowerCase()) !== -1).map(item =>(<option key = {item}>{item}</option>)).length > 0){
        return allTimeZone.filter( item => item.toLocaleLowerCase().indexOf(this.state.city.toLowerCase()) !== -1).map(item =>(
            <option key = {item}>{item}</option>))
    }

    return allTimeZone.map(item =>(
        <option key = {item}>{item}</option>
    ));
}else {
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

    /*
    <button onClick={(e) => this.myFunction(e)}>Click me</button>
     myFunction(e) {
        console.log('Ggg');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(positon){
                console.log(positon);
                e.get("http://maps.googleapis.com/map/api/geocode/json?latlng=" + positon.coords.latitude + "," +
                positon.coords.longitude + "&sensor=false", function (data) {
                    console.log(data);
                })
            });
            
        }else{
              console.log("no geolocation position");  
            }
      }
*/

/* {allTimeZone.map(item =>(
                        <option key = {item}>{item}</option>
                    ))} */

    render() {
        console.log(this.state.city);
        return (
            <>
            <Form style = {{margin: 50}} onSubmit={(e) => this.onSubmit(e)} ref="form">
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName" value={this.state.name} 
                onChange={this.handleUserInput} >
                <Form.Label >First name</Form.Label>
                <Form.Control name="firstName" placeholder="Enter name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword" value={this.state.lastName} 
                onChange={this.handleUserInput}>
                <Form.Label>Last name</Form.Label>
                <Form.Control name="lastName" placeholder="Last name" />
                </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress1" value={this.state.phoneNumber} 
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
                <Form.Control name="city" placeholder="City"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip" value={this.state.country} 
                onChange={this.handleUserInput}>
                <Form.Label>Country</Form.Label>
                <Form.Control name="country" placeholder="Country"/>
                </Form.Group>

                

                <Form.Group as={Col} controlId="formGridState" value={this.state.timeZone} 
                onChange={this.handleUserInput} >
                <Form.Label>Time zone</Form.Label>
                <Form.Control as="select" name="timeZone" placeholder="Country">
                    {this.showlist()}
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