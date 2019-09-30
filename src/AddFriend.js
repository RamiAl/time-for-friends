import React, {Component} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {Friend} from 'the.rest/dist/to-import';
import moment from 'moment-timezone';
import store from './utilities/Store';

const allTimeZone =  moment.tz.names();

{store.lang ? allTimeZone.unshift("Choose timezone") : allTimeZone.unshift("Välj en Tidszon")}
export default class AddFriend extends Component {
    
    async componentDidMount(){
    store.subscribeToChanges(this.storeSubscriber);
    
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
        
        //let s = this.state;
        e.preventDefault();
        
        //if (s.firstName.length >= 3 &&  s.lastName.length >= 3 && s.phoneNumber.length === 9 && s.city.length >= 3 && s.country.length >= 3 && this.validateEmail(s.emailAddress)){
            
        //}
      
        if (await this.vald() === true) {
            //e.target.className += " was-validated"; 
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

    /*validateEmail(email) {   
        const emailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return emailRegex.test(email);
    }*/

    ///<Form.Control  name="firstName" placeholder="Enter name" />
    render() {
        //console.log(this.state.city);
        return (
            <>
            {store.lang ? <Form style = {{margin: 50}} onSubmit={(e) => this.onSubmit(e)} ref="form">
            <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName" value={this.state.name} 
                onChange={this.handleUserInput} >
                <Form.Label>First name</Form.Label>
                <Form.Control  name="firstName" placeholder="Enter name" />
                {(this.state.showFirstName ? <Form.Label className="error">File in Firstname</Form.Label>:<Form.Label ></Form.Label>)}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLastName" value={this.state.lastName} 
                onChange={this.handleUserInput}>
                <Form.Label>Last name</Form.Label>
                <Form.Control name="lastName" placeholder="Last name" />
                {(this.state.showLastName ? <Form.Label className="error">File in Lastname</Form.Label>:<Form.Label ></Form.Label>)}
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
                {(this.state.showTimeZone ? <Form.Label className="error">Choose a timezone</Form.Label>:<Form.Label ></Form.Label>)}
                </Form.Group>


            </Form.Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            
            </Form> 
            
            : 
            
            <Form style = {{margin: 50}} onSubmit={(e) => this.onSubmit(e)} ref="form">
            <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName" value={this.state.name} 
                onChange={this.handleUserInput} >
                <Form.Label>Förnamn</Form.Label>
                <Form.Control  name="firstName" placeholder="Skriv in förnamn" />
                {(this.state.showFirstName ? <Form.Label className="error">Fyll i namn</Form.Label>:<Form.Label ></Form.Label>)}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLastName" value={this.state.lastName} 
                onChange={this.handleUserInput}>
                <Form.Label>Efternamn</Form.Label>
                <Form.Control name="lastName" placeholder="Efternamn" />
                {(this.state.showLastName ? <Form.Label className="error">Fyll i Efternamn</Form.Label>:<Form.Label ></Form.Label>)}
                </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col} controlId="formGridPhoneNumber" value={this.state.phoneNumber} 
                onChange={this.handleUserInput}>
                <Form.Label>Telefon nummer</Form.Label>
                <Form.Control name="phoneNumber" placeholder="Telefon nummer" />
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
                <Form.Label>Stad</Form.Label>
                <Form.Control name="city" placeholder="Stad" ref ="city"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCountry" value={this.state.country} 
                onChange={this.handleUserInput}>
                <Form.Label>Land</Form.Label>
                <Form.Control name="country" placeholder="Land" ref ="cuntry"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTimeZone" value={this.state.timeZone} 
                onChange={this.handleUserInput} >
                <Form.Label>Tidszon</Form.Label>
                <Form.Control as="select" name="timeZone" ref ="timeZone">
                    {this.showTimeZoneList()}
                </Form.Control >
                {(this.state.showTimeZone ? <Form.Label className="error">Välj en Tidszon</Form.Label>:<Form.Label ></Form.Label>)}
                </Form.Group>


            </Form.Row>

            <Button variant="primary" type="submit">
                Sicka
            </Button>
            
            </Form>
        }
            
            
            </>
        );
    }
}



