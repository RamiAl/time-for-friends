import React, {Component} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {Friend} from 'the.rest/dist/to-import';
import moment from 'moment-timezone';

const allTimeZone =  moment.tz.names();
allTimeZone.unshift("Choose timezone");

export default class AddFriend extends Component {
    conter = 0;
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailAddresses: [String],
            city: '',
            country: '',
            timeZone: '',
            showFirstName: false,
            showLastName: false,
            showTimeZone: false,
          };
        this.handleUserInput = this.handleUserInput.bind(this);
    } 

    async handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
       await this.setState({[name]: value});
    }           

    check(){
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
        if (await this.vald() === true) {
            let friend = new Friend (this.state);
            await friend.save();
            this.props.history.push(`/friendPage/${friend._id}`)
        }
        
    }

    async vald(){
        await this.valFirstName();
        await this.valLastName();
        await this.valTimeZone();
        if (this.state.showFirstName === false 
            && this.state.showLastName === false 
            && this.state.showTimeZone === false) {
                return true
        }else{
                return false   
        }      
    }

    
    valFirstName(){
        if (this.state.firstName ==='') {
            this.setState({showFirstName: true})
        }else{
            this.setState({showFirstName: false})
        }
    }
    valLastName(){
        if (this.state.lastName ==='') {
            this.setState({showLastName: true})
        }else{
            this.setState({showLastName: false})
        }
    }
    valTimeZone(){
        if (this.state.timeZone ==='' || this.state.timeZone ==='Choose timezone') {
            this.setState({showTimeZone: true})
        }else{
            this.setState({showTimeZone: false})
        }
    }

    handleAddEmailAddress(){        
        this.setState({
            emailAddresses: this.state.emailAddresses.concat([""])
        }); 
        this.conter++
    }

    handleEmailInput(e, index){
        const { emailAddresses } = this.state;
        emailAddresses[index] = e.target.value;
        
        this.setState({
            emailAddresses,
        })
       
    }
    handleRemoveEmail(index){
        const { emailAddresses } = this.state;
        emailAddresses.splice(index, 1);
        
        this.setState({
            emailAddresses,
        })
        this.conter--
    }


    /*validateEmail(email) {   
        const emailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return emailRegex.test(email);
    }*/

    render() {
        return (
            <>
                <Form className="addFriendForm" onSubmit={(e) => this.onSubmit(e)} ref="form">
                    <h2>Add New Friend</h2>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName" value={this.state.name} 
                    onChange={e => this.handleUserInput(e)} >
                    <Form.Label >First name</Form.Label>
                    <Form.Control  name="firstName" placeholder="Enter name" />
                    {(this.state.showFirstName ? <Form.Label className="error">File in name</Form.Label>:<Form.Label ></Form.Label>)}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName" value={this.state.lastName} 
                    onChange={e => this.handleUserInput(e)}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control name="lastName" placeholder="Enter last name" />
                    {(this.state.showLastName ? <Form.Label className="error">File in lastName</Form.Label>:<Form.Label ></Form.Label>)}
                    </Form.Group>
                </Form.Row>

                <Form.Row className="col-md-13">
                    <Form.Group as={Col} controlId="formGridPhoneNumber" value={this.state.phoneNumber} 
                        onChange={e => this.handleUserInput(e)}>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control name="phoneNumber" placeholder="Enter phone number" />
                    </Form.Group>

                    <div className="col-md-6">
                    <Form.Row style={{justifyContent: 'space-between'}}>
                        <Form.Label>Email address</Form.Label>                        
                        <button type="button" onClick={e => this.handleAddEmailAddress(e)} className="btn btn-info plusButton">
                            <div className="plusteken">+</div>
                        </button>
                    </Form.Row>

                    {this.state.emailAddresses.map((emailAddress, index) => (
                        <div className="emailAddress" key = {index}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail" value={emailAddress} 
                                onChange={e => this.handleEmailInput(e, index)}>
                                    <Form.Control name="emailAddress" placeholder="Enter email address" />
                                </Form.Group>
                                <div>
                                    {this.conter === 0 ? null :           
                                        <button
                                        type="button"
                                        onClick={e => this.handleRemoveEmail(index)}
                                        className="btn btn-info"
                                        >
                                        -
                                        </button>
                                    }
                                </div> 
                            </Form.Row>
                        </div>
                    ))}
                    </div>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity" value={this.state.city} 
                    onChange={e => this.handleUserInput(e)}>
                    <Form.Label>City</Form.Label>
                    <Form.Control name="city" placeholder="Enter city" ref ="city"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCountry" value={this.state.country} 
                    onChange={e => this.handleUserInput(e)}>
                    <Form.Label>Country</Form.Label>
                    <Form.Control name="country" placeholder="Enter country" ref ="country"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridTimeZone" value={this.state.timeZone} 
                    onChange={e => this.handleUserInput(e)} >
                    <Form.Label>Time zone</Form.Label>
                    <Form.Control as="select" name="timeZone" ref ="timeZone">
                        {this.showTimeZoneList()}
                    </Form.Control >
                    {(this.state.showTimeZone ? <Form.Label className="error">Choose a timezone</Form.Label>:<Form.Label ></Form.Label>)}
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



