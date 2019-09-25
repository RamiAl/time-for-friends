import React, {Component} from  'react';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import {Friend} from 'the.rest/dist/to-import';
import moment from 'moment-timezone';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

export default class AddFriend extends Component {
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
    } 

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}); 
    }           

    async onSubmit(e){
        let s = this.state;
        e.preventDefault();
        e.target.className += " was-validated"; 
        if (s.firstName.length >= 3 &&  s.lastName.length >= 3 && s.phoneNumber.length === 9 && s.city.length >= 3 && s.country.length >= 3 && this.validateEmail(s.emailAddress)){
            let friend = new Friend (this.state);
            await friend.save();
            this.props.history.push(`/friendPage/${friend._id}`)
        }
    }

    validateEmail(email) {   
        const emailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        return emailRegex.test(email);
    }

    render() {
        const allTimeZone =  moment.tz.names();
        return (
            <div>
        <form
          className="needs-validation"
          style = {{margin: 50}}
          onSubmit={(e) => this.onSubmit(e)}
          noValidate
          ref="form"
        >
          <MDBRow>
            <MDBCol md="6" className="mb-3">
              <label
                htmlFor="defaultFormRegisterNameEx"
                className="grey-text"
              >
                First name
              </label>
              <input
                value={this.state.name}
                name="firstName"
                onChange={this.handleUserInput}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                placeholder="First name"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </MDBCol>
            <MDBCol md="6" className="mb-3">
              <label
                htmlFor="defaultFormRegisterEmailEx2"
                className="grey-text"
              >
                Last name
              </label>
              <input
                value={this.state.lastName}
                name="lastName"
                onChange={this.handleUserInput}
                type="text"
                id="defaultFormRegisterEmailEx2"
                className="form-control"
                placeholder="Last name"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </MDBCol>
            <MDBCol md="6" className="mb-3">
              <label
                htmlFor="defaultFormRegisterEmailEx2"
                className="grey-text"
              >
                Phone number
              </label>
              <input
                value={this.state.phoneNumber}
                name="phoneNumber"
                onChange={this.handleUserInput}
                type="text"
                id="defaultFormRegisterEmailEx2"
                className="form-control"
                placeholder="Phone number"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </MDBCol>

            <MDBCol md="6" className="mb-3">
              <label
                htmlFor="defaultFormRegisterEmailEx2"
                className="grey-text"
              >
                Email
              </label>
              <input
                value={this.state.ememailAddressail}
                name="emailAddress"
                onChange={this.handleUserInput}
                type="text"
                id="defaultFormRegisterEmailEx2"
                className="form-control"
                placeholder="Your Email address"
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </MDBCol>

          </MDBRow>
          <MDBRow>
            <MDBCol md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterPasswordEx4"
                className="grey-text"
              >
                City
              </label>
              <input
                value={this.state.city}
                onChange={this.handleUserInput}
                type="text"
                id="defaultFormRegisterPasswordEx4"
                className="form-control"
                name="city"
                placeholder="City"
                required
              />
              <div className="invalid-feedback">
                Please provide a valid city.
              </div>
              <div className="valid-feedback">Looks good!</div>
            </MDBCol>
            <MDBCol md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterPasswordEx4"
                className="grey-text"
              >
                Country
              </label>
              <input
                value={this.state.country}
                onChange={this.handleUserInput}
                type="text"
                id="defaultFormRegisterPasswordEx4"
                className="form-control"
                name="country"
                placeholder="country"
                required
              />
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
              <div className="valid-feedback">Looks good!</div>
            </MDBCol>

            <Form.Group as={Col} controlId="formGridState" value={this.state.timeZone} 
                onChange={this.handleUserInput} >
                <Form.Label>Time zone</Form.Label>
                <Form.Control as="select" name="timeZone" placeholder="Country">
                    {allTimeZone.map(item =>(
                        <option key = {item}>{item}</option>
                    ))}
                </Form.Control >
                </Form.Group>
           
          </MDBRow>
          <MDBBtn color="primary" type="submit">
            Submit Form
          </MDBBtn>
        </form>
      </div>
        );
    }
}



